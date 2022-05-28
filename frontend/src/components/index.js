/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
//Default data
import defaultData from './data/default.json'
//Components
import Modal from './modal';
import SideFilter from './SideFilter';
import SearchBar from './SearchBar';
import Body from './body';
//Functions
import { consultarApi, ordenarDatos, separarDatos, fillFilterOptions, filtrarDatos, filterByValue } from './helpers';

const App = () => {
  const [dataOrigin, setDataOrigin] = useState([]);
  const [dataToFilter, setDataToFilter] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [filters, setFilters] = useState(defaultData.filters);
  const [filtersUpdate, setFiltersUpdate] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [modal, setModal] = useState({});
  useEffect(() => {
    consultarDatos();
  }, [])
  useEffect(() => {
    if(filtersUpdate){
      const { datos, filtros } = filtrarDatos(dataToFilter, filters, defaultData.types)
      setDataSource(datos);
      setFiltersUpdate(false);
      setFilters(filtros);
    }
  }, [filters])
  const consultarDatos = async () => {
    const datos = ordenarDatos(await consultarApi());
    setFilters(fillFilterOptions(datos, filters));
    setDataOrigin(datos);
    setDataToFilter(datos);
    setDataSource(separarDatos(datos, defaultData.types));
  }
  const updateFilter = (key, value, checked) => {
    const index_1 = filters.findIndex(filter => filter.key === key);
    const index_2 = filters[index_1].options.findIndex(option => option.key === value);
    filters[index_1].options[index_2].value = checked;
    setFilters([...filters]);
    if(!filtersUpdate){
      setFiltersUpdate(true);
    }
  }
  const onSearch = (search) => {
    const datos = filterByValue(dataOrigin, search);
    setFilters(fillFilterOptions(datos, filters));
    setDataToFilter(datos);
    setDataSource(separarDatos(datos, defaultData.types));
  }
  return (
    <div className="App">
      <div className="body">
        <div className="flex-box">
          <button className="btn btn-mg" onClick={() => { setActiveFilter(true) }}>
            <FontAwesomeIcon icon={faBars} />
            <span>Filters</span>
          </button>
          <SearchBar onSearch={onSearch} className="btn-mg"/>
        </div>
        <SideFilter
          filters={filters}
          className={activeFilter && "active"}
          onClose={() => setActiveFilter(false)}
          updateFilter={updateFilter}
        />
        <Body dataSource={dataSource} setModal={setModal}/>
        {modal && modal.id && <Modal open={true} data={modal} onClose={() => setModal({})} />}
      </div>
    </div>
  );
}

export default App;
