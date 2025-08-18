<template>
  <div>
    <ButtonComponent
      :text="title"
      @clicked="changeShowMenu()"
    />
    <div class="flex flex-col gap-y-2 mt-2">
      <MenuPopupItem
        v-for="(item, index) in list"
        :key="index"
        v-bind="item"
        v-show="showMenu"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IListItem {
  name: string
  icon: string
  method: () => void
}

const { title = 'open', list = [] } = defineProps<{
  title: string
  list: IListItem[]
}>()

const showMenu = ref<boolean>(false)

const changeShowMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
