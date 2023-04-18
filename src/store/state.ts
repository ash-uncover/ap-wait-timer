import AppState from './app/app.state'
import DataState from './data/data.state'

type RootState = {
  app: AppState,
  data: DataState,
}

export default RootState