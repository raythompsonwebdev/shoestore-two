"use client"
import { SetStateAction, useState, useEffect } from 'react'
import SpecialsProductBoxes from '../../components/specials/specialsProductBoxes'
import AccordianMenu from '../../components/accordianMenu'
import SearchBar from '../../components/searchBar/SearchBar'
import SearchSelect from '../../components/searchSelect/SearchSelect'
import { Product } from '../../types/index'
import {
  getSearchData,
  fetchSearchData,
  getSearchBarStatus,
} from '../../features/searchdata/searchdataSlice'
import {
  selectAllAccordian,
  fetchAccordian,
  getAccordianStatus,
} from '../../features/accordian/accordianSlice'
import {
  selectAllProducts,
  fetchProducts,
  getProductsStatus,
} from '../../features/products/productSlice'
import {
  getSelectData,
  fetchSelectData,
  getSelectDataStatus,
} from '../../features/selectdata/selectdataSlice'
import { useAppSelector, useAppDispatch } from '../../app/store'
import 'bootstrap/dist/css/bootstrap.min.css'

const Specials = () => {
  const [productData, setProductData] = useState<Product[]>([])
  const [OrderDir, setOrderByDir] = useState<string>('asc')
  const [OrderByVal, setOrderByVal] = useState<string>('all')
  const [visibility, setVisibility] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  // get Products
  const productItems = useAppSelector(selectAllProducts)
  const productItemsStatus = useAppSelector(getProductsStatus)
  //const productItemsError = useAppSelector(getProductsError);

  // acoordian data
  const accordianItems = useAppSelector(selectAllAccordian)
  const accordianDataStatus = useAppSelector(getAccordianStatus)
  //const accordianDataError = useAppSelector(getAccordianError);

  // searchbar data
  const searchbarItems = useAppSelector(getSearchData)
  const searchbarDataStatus = useAppSelector(getSearchBarStatus)
  //const searchbarDataError = useAppSelector(getSearchBarError);

  // selectbar data
  const selectbarItems = useAppSelector(getSelectData)
  const selectbarDataStatus = useAppSelector(getSelectDataStatus)
  //const selectbarDataError = useAppSelector(getSelectBarError);

  useEffect(() => {
    if (productItemsStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [productItemsStatus, dispatch])

  useEffect(() => {
    if (accordianDataStatus === 'idle') {
      dispatch(fetchAccordian())
    }
  }, [accordianDataStatus, dispatch])

  useEffect(() => {
    if (searchbarDataStatus === 'idle') {
      dispatch(fetchSearchData())
    }
  }, [searchbarDataStatus, dispatch])

  useEffect(() => {
    if (selectbarDataStatus === 'idle') {
      dispatch(fetchSelectData())
    }
  }, [selectbarDataStatus, dispatch])

  //set products data
  useEffect(() => {
    if (productItemsStatus === 'succeeded') {
      setProductData(productItems)
    }
  }, [productItemsStatus, productItems])

  const handleChange = (selected: SetStateAction<string>) => {
    setOrderByVal(selected)
    setOrderByDir('asc')
  }

  const sidebarVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setVisibility(!visibility)
  }

  const changesOrders = (
    orderbyval: SetStateAction<string>,
    dir: SetStateAction<string>
  ) => {
    setOrderByVal(orderbyval)
    setOrderByDir(dir)
  }

  let filteredApts = productData

  const value = OrderByVal

  filteredApts = filteredApts?.filter((item) => {
    if (
      item.color === value ||
      item.style === value ||
      item.size === value ||
      item.gender === value
    ) {
      return item
    }

    return item[value]
  })

  return (
    <>
      <main id="main-content" className="clearfix">
        {searchbarItems ? (
          <SearchBar labelname="Specials" searchData={searchbarItems} />
        ) : (
          <div>No results</div>
        )}

        <button
          id="sidebar-toggle-btn"
          type="button"
          onClick={sidebarVisibility}
          aria-label="secondary menu toggle button"
        >
          SIDE
        </button>

        <aside
          className={`left-side-content ${visibility ? 'is-expanded' : ' '}`}
        >
          <AccordianMenu accordianData={accordianItems} />
        </aside>

        <section id="right-content-section" role="main">
          <SearchSelect
            orderByVal={OrderByVal}
            orderDir={OrderDir}
            changesOrders={changesOrders}
            handleChange={handleChange}
            selectBarData={selectbarItems || ''}
          />
          <SpecialsProductBoxes productData={filteredApts} />

          <br />
        </section>
      </main>
    </>
  )
}

export default Specials
