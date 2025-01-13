<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Hexadecimal Reference Table | OSU ECE 2060</title>
</svelte:head>

<div class="min-h-screen bg-[#121212] p-4 sm:p-6 md:p-8">
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <a 
        href="/" 
        class="inline-flex items-center gap-2 text-[#ba0c2f] hover:text-white transition-colors"
      >
        <span class="text-xl">←</span>
        <span>Back to Practice</span>
      </a>
    </div>
    
    <h1 class="text-3xl sm:text-4xl font-bold text-white mb-6">Hexadecimal Reference Table</h1>
    
    <div class="bg-[#1E1E1E] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8" transition:fade>
      <div class="overflow-x-auto">
        <table class="w-full text-white">
          <thead class="border-b border-[#2A2A2A]">
            <tr>
              <th class="p-3 text-left text-[#ba0c2f]">Hex</th>
              <th class="p-3 text-left text-[#ba0c2f]">Decimal</th>
              <th class="p-3 text-left text-[#ba0c2f]">Binary</th>
            </tr>
          </thead>
          <tbody>
            {#each Array(16) as _, i}
              <tr class="border-b border-[#2A2A2A]">
                <td class="p-3 font-mono">{i.toString(16).toUpperCase()}</td>
                <td class="p-3">{i}</td>
                <td class="p-3 font-mono">{i.toString(2).padStart(4, '0')}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div> 