<template lang="pug">
.body(class="bg-blue-500 w-full h-full flex flex-col items-center")
  ImageComponent(
    source="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png" 
    alt="nasa logo" 
    class="h-36 mt-16"
  )
  .inputs(class="mt-16")
    InputComponent()
    InputComponent()
    ButtonComponent(text="login" size="wide" class="w-full mt-8")
</template>
<script setup lang="ts"></script>
