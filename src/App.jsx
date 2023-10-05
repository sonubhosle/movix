import { useState, useEffect } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/Api'
import { useSelector,useDispatch } from 'react-redux';
import { getApiConfiguration,getGenres } from './Store/HomeSlice';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home';
import Details from './Pages/Details/Details'
import Serarch from './Pages/Search/Search'
import Explore from './Pages/Explore/Explore'
import PageNotFound from './Pages/PageNotFound/Page404'



function App() {
  const dispatch = useDispatch();
  const{ url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
      fetchApiConfig();
      genresCall();
  }, []);

  const fetchApiConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {
          console.log(res);

          const url = {
              backdrop: res.images.secure_base_url + "original",
              poster: res.images.secure_base_url + "original",
              profile: res.images.secure_base_url + "original",
          };

          dispatch(getApiConfiguration(url));
      });
  };

  const genresCall = async () =>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGeners = {}
 
    endPoints.forEach((url) =>{
       promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
     data.map(({genres}) =>{
        return genres.map((item)=> (allGeners[item.id] = item))
     })
     dispatch(getGenres(allGeners));
  }



  return (
     <BrowserRouter>
     <Header />
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:mediaType/:id' element={<Details />} />
      <Route path='/search/:query' element={<Serarch/>}/>
      <Route path='/explore/:mediaType' element={<Explore/>}/>
      <Route path='*' element={<PageNotFound/>} />
     </Routes>
     <Footer />
     </BrowserRouter>
  )
}

export default App
