import { mount } from 'svelte'
import './app.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App.svelte'

AOS.init({
  duration: 700,
  easing: 'ease-out',
  offset: 100,
  once: true,
})

mount(App, { target: document.getElementById('app') })
