<script lang="ts">
  export let number: string;
  export let fromBase: string;
  export let toBase: string;
  export let correctAnswer: string;

  function getBaseNumber(base: string): number {
    switch (base) {
      case 'binary': return 2;
      case 'decimal': return 10;
      case 'hexadecimal': return 16;
      case 'octal': return 8;
      default: return 10;
    }
  }

  function showSuccessiveDivision(num: number, targetBase: number) {
    const steps: { quotient: number; remainder: number }[] = [];
    let currentNum = num;

    while (currentNum > 0) {
      steps.push({
        quotient: Math.floor(currentNum / targetBase),
        remainder: currentNum % targetBase
      });
      currentNum = Math.floor(currentNum / targetBase);
    }

    return steps;
  }

  function showSuccessiveMultiplication(num: string, sourceBase: number) {
    const digits = num.split('').reverse();
    return digits.map((digit, index) => {
      const value = parseInt(digit, sourceBase);
      const multiplier = Math.pow(sourceBase, index);
      return {
        digit,
        position: index,
        value,
        multiplier,
        result: value * multiplier
      };
    });
  }

  function getPlaceValues(num: string, base: string): string[] {
    const places: string[] = [];
    const digits = num.split('').reverse();
    
    if (base === 'binary') {
      digits.forEach((_, i) => places.push(`2${i === 0 ? '' : '^' + i}`));
    } else if (base === 'decimal') {
      if (num.includes('.')) {
        const [whole, decimal] = num.split('.');
        const wholeDigits = whole.length;
        decimal.split('').forEach((_, i) => places.unshift(`10^-${i + 1}`));
        whole.split('').reverse().forEach((_, i) => places.unshift(`10^${i}`));
      } else {
        digits.forEach((_, i) => places.push(`10^${i}`));
      }
    } else if (base === 'hexadecimal') {
      digits.forEach((_, i) => places.push(`16^${i}`));
    }
    return places;
  }

  function formatPlaceValue(base: string, position: number): string {
    const baseNum = base === 'binary' ? '2' : base === 'hexadecimal' ? '16' : '10';
    return `${baseNum}<sup>${position}</sup>`;
  }

  function getPlaceValueResult(digit: string, base: string, position: number): number {
    const value = parseInt(digit, getBaseNumber(base));
    const baseNum = getBaseNumber(base);
    return value * Math.pow(baseNum, position);
  }

  $: fromBaseNum = getBaseNumber(fromBase);
  $: toBaseNum = getBaseNumber(toBase);
  $: decimalValue = parseInt(number, fromBaseNum);
  $: placeValues = getPlaceValues(correctAnswer, toBase);
</script>

<div class="font-mono text-sm text-[#a7b1b7] space-y-8">
  <!-- Answer with Place Values -->
  <div class="p-6 bg-[#1E1E1E] rounded-xl border-2 border-[#2A2A2A]">
    <h4 class="text-white font-medium mb-4">Final Answer with Place Values</h4>
    <p class="text-[#a7b1b7] mb-4">
      {#if toBase === 'binary'}
        Read from left to right: Most significant bit (MSB) to least significant bit (LSB)
      {:else if toBase === 'hexadecimal'}
        Read from left to right: Most significant digit to least significant digit
      {:else}
        Read from left to right: Highest place value to lowest place value
      {/if}
    </p>
    <div class="flex flex-wrap gap-2 sm:gap-4 justify-center">
      {#each correctAnswer.split('') as digit, i}
        <div class="flex flex-col items-center gap-1">
          <span class="text-white text-lg sm:text-xl">{digit}</span>
          <span class="text-[#ba0c2f]">▼</span>
          <span class="text-[#a7b1b7] text-xs">{@html formatPlaceValue(toBase, correctAnswer.length - i - 1)}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Conversion Steps -->
  {#if toBase === 'decimal'}
    <!-- Converting to Decimal -->
    <div class="p-6 bg-[#1E1E1E] rounded-xl border-2 border-[#2A2A2A]">
      <h4 class="text-white font-medium mb-4">Converting to Decimal</h4>
      <p class="text-[#a7b1b7] mb-4">
        Start from the rightmost digit (least significant) and work left, multiplying each digit by its place value
      </p>
      <div class="space-y-4">
        <!-- Show each digit's calculation -->
        {#each number.split('').reverse() as digit, i}
          <div class="grid grid-cols-[1fr,auto] gap-4 items-center">
            <div class="flex items-center gap-2">
              <span class="text-white">{digit}</span>
              <span class="text-[#a7b1b7]">×</span>
              <span class="text-[#ba0c2f]">{@html formatPlaceValue(fromBase, i)}</span>
              <span class="text-[#a7b1b7]">=</span>
            </div>
            <div class="text-white">
              {getPlaceValueResult(digit, fromBase, i)}
            </div>
          </div>
        {/each}
        
        <!-- Sum line -->
        <div class="pt-4 border-t border-[#2A2A2A] grid grid-cols-[1fr,auto] gap-4">
          <span class="text-[#ba0c2f]">Sum</span>
          <span class="text-white font-bold">{correctAnswer}</span>
        </div>
      </div>
    </div>
  {:else}
    <!-- Converting from Decimal -->
    <div class="p-6 bg-[#1E1E1E] rounded-xl border-2 border-[#2A2A2A]">
      <h4 class="text-white font-medium mb-4">Converting from Decimal using Division</h4>
      <p class="text-[#a7b1b7] mb-4">
        Perform divisions from top to bottom, then read remainders from bottom to top to get your answer
      </p>
      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-[400px]">
          <thead>
            <tr>
              <th class="text-left p-3 text-[#a7b1b7]">Number</th>
              <th class="text-left p-3 text-[#a7b1b7]">÷ {toBaseNum}</th>
              <th class="text-left p-3 text-[#a7b1b7]">Remainder</th>
            </tr>
          </thead>
          <tbody>
            {#each showSuccessiveDivision(parseInt(number), toBaseNum) as step}
              <tr class="border-t border-[#2A2A2A]">
                <td class="p-3">{step.quotient * toBaseNum + step.remainder}</td>
                <td class="p-3">{step.quotient}</td>
                <td class="p-3">
                  <span class="text-[#ba0c2f] font-bold">
                    {step.remainder.toString(toBaseNum).toUpperCase()}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="mt-4 text-[#a7b1b7]">Reading remainders bottom to top gives us: 
        <span class="text-white font-bold">{correctAnswer}</span>
      </p>
    </div>
  {/if}

  <!-- Additional Helpful Information -->
  {#if toBase === 'binary'}
    <div class="p-6 bg-[#1E1E1E] rounded-xl border-2 border-[#2A2A2A]">
      <h4 class="text-white font-medium mb-4">Binary Grouping</h4>
      <div class="flex flex-wrap gap-2">
        {#each correctAnswer.padStart(Math.ceil(correctAnswer.length / 4) * 4, '0').match(/.{4}/g) || [] as group}
          <div class="bg-[#2A2A2A] px-3 py-2 rounded">
            <span class="text-white font-bold">{group}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if toBase === 'hexadecimal'}
    <div class="p-6 bg-[#1E1E1E] rounded-xl border-2 border-[#2A2A2A]">
      <h4 class="text-white font-medium mb-4">Hexadecimal Values</h4>
      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        {#each correctAnswer.split('') as digit}
          <div class="bg-[#2A2A2A] px-3 py-2 rounded flex gap-2">
            <span class="text-white font-bold">{digit}</span>
            <span class="text-[#a7b1b7]">=</span>
            <span class="text-[#ba0c2f]">{parseInt(digit, 16)}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div> 