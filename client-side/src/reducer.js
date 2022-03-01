import { useGlobalContext, Fetch } from './context'

const reducer1 = (state, action) => {
    switch (action.type) {
      case 'FETCH_DATA':
        return { ...state, data: action.payload }
      case 'SET_NavSubRef':
        return {...state, nav_sub_ref: action.ref}
    //   case REMOVE_STORY:
    //     return {
    //       ...state,
    //       hits: state.hits.filter((story) => story.objectID !== action.payload),
    //     }
    //   case HANDLE_SEARCH:
    //     return { ...state, query: action.payload, page: 0 }
    //   case HANDLE_PAGE:
    //     if (action.payload === 'inc') {
    //       let nextPage = state.page + 1
    //       if (nextPage > state.nbPages - 1) {
    //         nextPage = 0
    //       }
    //       return { ...state, page: nextPage }
    //     }
    //     if (action.payload === 'dec') {
    //       let prevPage = state.page - 1
    //       if (prevPage < 0) {
    //         prevPage = state.nbPages - 1
    //       }
    //       return { ...state, page: prevPage }
    //     }
      default:
        throw new Error(`no mathching "${action.type}" action type`)
    }
  }

  const reducer2 = (state, action) => {
    switch (action.type) {
      case 'CHANGE_URL':
        return { ...state, url: action.url }
      default:
      throw new Error(`no mathching "${action.type}" action type`)
    }
  }

  export {reducer1, reducer2}
  