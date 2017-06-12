import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

// Auth
import Login from '@/components/pages/auth/Login'
import Signup from '@/components/pages/auth/Signup'
import Profile from '@/components/pages/auth/Profile'

// Character
import CharacterList from '@/components/pages/character/CharacterList'
import NewCharacter from '@/components/pages/character/NewCharacter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/signup',
      name: 'Sign Up',
      component: Signup
    }, {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }, {
      path: '/login',
      name: 'Log In',
      component: Login
    }, {
      path: '/character-list',
      name: 'Character List',
      component: CharacterList
    }, {
      path: '/new-character',
      name: 'New Character',
      component: NewCharacter
    }
  ]
})
