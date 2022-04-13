import { getTvShow } from './models/TVShow'
import axios from 'axios'

import renderTVShowDetails from './components/TVShowDetails'
import { SINGLE_SHOW_API_URL } from './config'
import './style.css'

const $ = document.querySelector.bind(document)

let loader = <HTMLElement>$('#loader');

const searchTVShow = async (id: string) => {
  loader.style.display = 'block';

  const http = axios.create({
    baseURL: SINGLE_SHOW_API_URL,
  })

  const response = await http.get(`/${id}`)

  if (response.status == 200) {
    const { data } = response
    const tvShow = getTvShow(data)
    const container = <HTMLDivElement>$('#container')
    renderTVShowDetails(tvShow, container)
    loader.style.display = 'none';
  }
}

const params = new URLSearchParams(document.location.search)
const id = params.get('id')
if (id) {
  searchTVShow(id)
}
