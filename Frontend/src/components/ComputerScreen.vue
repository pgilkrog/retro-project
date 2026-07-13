<template>
  <div class="game-container h-full w-full">
    <div class="flex flex-col items-center">
      <div class="bg-shadow p-8 fit-content bg-gray-300">
        <div class="bg-shadow-inner img-box bg-gray-300">
          <slot></slot>
        </div>
      </div>
      <div class="square-1 bg-shadow bg-gray-300 h-[20px] w-[450px]" />
      <div class="square-2 bg-shadow bg-gray-300 h-[30px] w-[320px]" />
      <div class="square-3 bg-shadow bg-gray-300 h-[15px] w-[650px]" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
