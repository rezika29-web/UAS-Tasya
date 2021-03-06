
export default function(Vue){
    let authenticatedUser = {}
  
    Vue.auth = {
      //settoken
      setToken (token,expiration) {
        localStorage.setItem('token',token)
        localStorage.setItem('expiration',expiration)
      },
  
      //gettoken
      getToken () {
        var token = localStorage.getItem('token')
        var expiration =  localStorage.getItem('expiration')
  
        if(!token || !expiration)
          return null
  
        if(Date.now() > parseInt(expiration)){
          this.destroyToken()
          return null
        }else{
          return token
        }
      },
      
       //gettoken
       getUser () {
        const name = localStorage.getItem('name')
          return name
      },
      getNip(){
        const nip = localStorage.getItem('nip')
        return nip
      },

      //destroytoken
      destroyToken () {
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
      },
  
      //isAutentiaced
      isAuthenticated () {
        if(this.getToken())
          return true
        else
          return false
      },
  
      setAuthenticatedUser (data) {
        authenticatedUser = data
      },
  
      getAuthenticatedUser () {
        return authenticatedUser
      }
    }
  
    Object.defineProperties(Vue.prototype, {
      $auth: {
        get () {
          return Vue.auth
        }
      }
    })
}
  
  