<script lang="ts">
  import { fade } from 'svelte/transition';
  import ConversionSolution from '$lib/components/ConversionSolution.svelte';
  
  type ConversionType = {
    from: 'decimal' | 'binary' | 'hexadecimal' | 'octal';
    to: 'decimal' | 'binary' | 'hexadecimal' | 'octal';
    label: string;
  };

  const conversionTypes: ConversionType[] = [
    { from: 'decimal', to: 'binary', label: 'Decimal to Binary' },
    { from: 'binary', to: 'decimal', label: 'Binary to Decimal' },
    { from: 'decimal', to: 'hexadecimal', label: 'Decimal to Hex' },
    { from: 'hexadecimal', to: 'decimal', label: 'Hex to Decimal' },
    { from: 'binary', to: 'hexadecimal', label: 'Binary to Hex' },
    { from: 'hexadecimal', to: 'binary', label: 'Hex to Binary' }
  ];

  let selectedConversion: ConversionType = conversionTypes[0];
  let currentNumber: string = '';
  let userAnswer: string = '';
  let attempts: number = 0;
  let maxAttempts: number = 3;
  let showSolution: boolean = false;
  let isCorrect: boolean | null = null;
  let score: number = 0;
  let correctAnswer: string = '';

  function generateNewNumber() {
    showSolution = false;
    isCorrect = null;
    userAnswer = '';
    attempts = 0;

    const randomNum = Math.floor(Math.random() * 255);

    // Generate appropriate random number based on conversion type
    if (selectedConversion.from === 'decimal') {
      currentNumber = randomNum.toString();
    } else if (selectedConversion.from === 'binary') {
      currentNumber = Math.floor(randomNum).toString(2).padStart(8, '0');
    } else {
      currentNumber = Math.floor(randomNum).toString(16).toUpperCase();
    }

    // Pre-calculate correct answer
    if (selectedConversion.to === 'binary') {
      correctAnswer = parseInt(currentNumber, getBase(selectedConversion.from)).toString(2);
    } else if (selectedConversion.to === 'decimal') {
      correctAnswer = parseInt(currentNumber, getBase(selectedConversion.from)).toString();
    } else {
      correctAnswer = parseInt(currentNumber, getBase(selectedConversion.from)).toString(16).toUpperCase();
    }
  }

  function checkAnswer() {
    if (attempts >= maxAttempts) return;
    if (!userAnswer.trim()) return; // Don't check empty answers
    
    isCorrect = userAnswer.trim().toUpperCase() === correctAnswer.toUpperCase();
    attempts++;

    if (isCorrect) {
      score += Math.max(4 - attempts, 1); // More points for fewer attempts
    }
    
    if (attempts >= maxAttempts || isCorrect) {
      showSolution = true;
    }
  }

  function getBase(type: string): number {
    switch (type) {
      case 'binary': return 2;
      case 'decimal': return 10;
      case 'hexadecimal': return 16;
      case 'octal': return 8;
      default: return 10;
    }
  }

  // Generate first number on mount
  generateNewNumber();
</script>

<svelte:head>
  <title>
    Base Conversion Practice - {selectedConversion.label} | OSU ECE 2060
  </title>
  <meta 
    name="description" 
    content="Practice converting numbers between different bases. A tool for OSU ECE 2060 students."
  />
</svelte:head>

<div class="min-h-screen bg-[#121212] p-4 sm:p-6 md:p-8">
  <div class="max-w-3xl mx-auto w-full">
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Base Conversion</h1>
      <p class="text-[#ba0c2f] text-lg font-medium tracking-wide">OSU ECE 2060</p>
    </div>
    
    <div class="bg-[#1E1E1E] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-8">
        <div class="flex items-center gap-6">
          <select 
            bind:value={selectedConversion}
            on:change={generateNewNumber}
            class="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl bg-[#2A2A2A] text-white border-2 border-[#2A2A2A] focus:border-[#ba0c2f] transition-colors outline-none text-sm font-medium"
          >
            {#each conversionTypes as type}
              <option value={type}>{type.label}</option>
            {/each}
          </select>
        </div>
        
        <div class="bg-[#2A2A2A] px-4 sm:px-6 py-3 rounded-xl w-full sm:w-auto text-center">
          <span class="text-[#a7b1b7] mr-2 text-sm font-medium">Score</span>
          <span class="text-[#ba0c2f] font-bold text-xl">{score}</span>
        </div>
      </div>

      <div class="text-center mb-6 sm:mb-10 bg-[#2A2A2A] p-4 sm:p-6 md:p-8 rounded-2xl">
        <p class="text-[#a7b1b7] mb-4 text-sm font-medium uppercase tracking-wider">Convert this number</p>
        <p class="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white mb-4 tracking-wider break-all">{currentNumber}</p>
        <p class="text-[#a7b1b7] text-sm font-medium">From {selectedConversion.from} to {selectedConversion.to}</p>
        <p class="text-[#a7b1b7] text-sm font-medium mt-4">
          {#if selectedConversion.from === 'binary'}
            Read from left to right: Most significant bit (MSB) to least significant bit (LSB)
          {:else if selectedConversion.from === 'hexadecimal'}
            Read from left to right: Most significant digit to least significant digit
          {:else}
            Read from left to right: Highest place value to lowest place value
          {/if}
        </p>
      </div>

      <div class="mb-8">
        <input
          type="text"
          bind:value={userAnswer}
          placeholder="Enter your answer"
          class="w-full px-6 py-4 rounded-xl bg-[#2A2A2A] text-white border-2 border-[#2A2A2A] focus:border-[#ba0c2f] transition-colors outline-none text-lg font-mono placeholder:text-[#4A4A4A]"
          on:keydown={(e) => e.key === 'Enter' && checkAnswer()}
          disabled={attempts >= maxAttempts || isCorrect}
        />
      </div>

      <div class="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <button
          on:click={checkAnswer}
          disabled={attempts >= maxAttempts || isCorrect}
          class="w-full sm:flex-1 bg-[#ba0c2f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:bg-[#8a0923] transition-colors {
            attempts >= maxAttempts || isCorrect ? 'opacity-50 cursor-not-allowed' : ''
          }"
        >
          Check Answer
        </button>
        <button
          on:click={generateNewNumber}
          class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium border-2 border-[#2A2A2A] text-white hover:border-[#ba0c2f] transition-colors"
        >
          New Number
        </button>
      </div>

      {#if isCorrect !== null}
        <div 
          class="p-6 rounded-xl text-center border-2 {
            isCorrect 
              ? 'bg-[#1a2f1a] text-[#4ade80] border-[#4ade80]/20' 
              : 'bg-[#2f1a1a] text-[#f87171] border-[#f87171]/20'
          }"
          transition:fade
        >
          {#if isCorrect}
            <p class="text-lg font-medium">Correct! Great job! 🎉</p>
          {:else}
            <p class="text-lg font-medium">
              {#if attempts >= maxAttempts}
                No more attempts left. The correct answer was: <span class="font-mono font-bold">{correctAnswer}</span>
              {:else}
                Not quite right. Try again! ({maxAttempts - attempts} attempts remaining)
              {/if}
            </p>
          {/if}
        </div>
      {/if}

      {#if showSolution}
        <div class="mt-8 p-6 bg-[#2A2A2A] rounded-xl" transition:fade>
          <h3 class="font-semibold text-white text-lg mb-6">Solution Steps</h3>
          <ConversionSolution 
            number={currentNumber} 
            fromBase={selectedConversion.from} 
            toBase={selectedConversion.to}
            correctAnswer={correctAnswer}
          />
        </div>
      {/if}
    </div>

    <footer class="mt-12 text-center text-[#a7b1b7] text-sm">
      <p>
        Created with 🌰 at The Ohio State University by <a href="https://davidstephenson.net" class="text-[#ba0c2f]">David Stephenson</a>
      </p>
    </footer>
  </div>
</div> 