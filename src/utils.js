export function uuid () {
    return Math.random().toString(16).slice(2)
  }
  
  export function saveStatePlugin (store) {
    store.subscribe(
      (mutation, state) => {
        localStorage.setItem(
          'choix','reference',
          JSON.stringify(state.board)
        )
      }
    )
  }