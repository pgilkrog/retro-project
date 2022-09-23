<template lang="pug">
.menu-wrapper.bg-secondary.fixed-bottom.fit-content.st-border.d-flex(v-if="showMenu")
  .side-bar.bg-dark
  .flex-column
    .menu-item(v-for="(item, index) in menuList" :key="index")
      MenuItem(:title="item.title" :img="item.img")
      .submenu.bg-secondary.st-border(v-if="item.subMenu !== undefined")
        .flex-column
          .menu-item(v-for="(subitem, subindex) in item.subMenu" :key="subindex")
            MenuItem(:title="subitem.title" :img="subitem.img") 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuItem from './MenuItem.vue';

@Component({
  components: {
    MenuItem
  },
  props: {
    showMenu: Boolean
  }
})

export default class Menu extends Vue {
  showMenu: boolean | undefined

  menuList = [
    {
      title: "Programs",
      img: "https://win98icons.alexmeub.com/icons/png/appwizard-5.png",
      subMenu: [
        {
          title: "Find",
          img: "https://win98icons.alexmeub.com/icons/png/search_file_2_cool-5.png",
        },    
        {
          title: "Settings",
          img: "https://win98icons.alexmeub.com/icons/png/settings_gear-2.png",
        },
        {
          title: "Documents",
          img: "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-5.png",
        },  

      ]
    },      
    {
      title: "Documents",
      img: "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-5.png",
      subMenu: [  
        {
          title: "Settings",
          img: "https://win98icons.alexmeub.com/icons/png/settings_gear-2.png",
        },
        {
          title: "Documents",
          img: "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-5.png",
        },  
        {
          title: "Programs",
          img: "https://win98icons.alexmeub.com/icons/png/appwizard-5.png",
        },  
      ]
    },  
    {
      title: "Settings",
      img: "https://win98icons.alexmeub.com/icons/png/settings_gear-2.png", 
      subMenu: undefined
    },
    {
      title: "Find",
      img: "https://win98icons.alexmeub.com/icons/png/search_file_2_cool-5.png", 
      subMenu: undefined
    },    
    {
      title: "Help",
      img: "https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png",
      subMenu: undefined
    },    
    {
      title: "Run...",
      img: "https://win98icons.alexmeub.com/icons/png/application_hourglass_small-4.png",   
      subMenu: undefined
    },        
    {
      title: "Shutdown...",
      img: "https://win98icons.alexmeub.com/icons/png/standby_monitor_moon-4.png",
      subMenu: undefined
    },  
  ]
}
</script>