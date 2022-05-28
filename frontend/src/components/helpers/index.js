import axios from 'axios';

export const consultarApi = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8080/getJson").then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    })
}

export const ordenarDatos = (datos) => {
    const obtenerValor = (Valor) => {
        switch (Valor) {
            case 'HQ':
                return 0;
            case 'Character':
                return 1;
            case 'Technology':
                return 2;
            default:
                return 1;
        }
    }
    return datos.sort((a, b) => {
        if (obtenerValor(a.CardType) < obtenerValor(b.CardType)) {
            return -1;
        }
        if (obtenerValor(a.CardType) > obtenerValor(b.CardType)) {
            return 1;
        }
        return 0;
    });
}
export const separarDatos = (datos, types) => {
    return types.map(type => {
        return {
            key: type.key,
            title: type.title,
            options: datos.filter(item => item.CardType === type.key)
        }
    })
}

export const fillFilterOptions = (datos, filtros) => {
    return filtros.map(filtro => {
        return {
            ...filtro,
            options: [...new Set(datos.map(item => item[filtro.key]))].map(el =>{
                return {
                    key: el,
                    value: false
                }
            })
        }
    })
}

const multipleFiltrado = (item, filtrosAplicadosKeys, filtrosAplicadosValues) =>{
    const filtrosCantidad = filtrosAplicadosKeys.length;
    let respuesta = false;
    let cont = 0;
    filtrosAplicadosKeys.forEach((key, index) => {
        if(filtrosAplicadosValues[index].includes(item[key])){
            cont++;
        }
        if(filtrosCantidad === cont){
            respuesta = true;
        }
    });
    return respuesta;
}

export const filtrarDatos = (datos, filtros, types) => {
    const filtrosAplicados = filtros.filter(filtro => filtro.options.filter(option => option.value).length > 0);
    if(filtrosAplicados.length > 0){
        const filtrosAplicadosKeys = filtrosAplicados.map(filtro => filtro.key);
        const filtrosAplicadosValues = filtrosAplicados.map(filtro => filtro.options.filter(option => option.value).map(option => option.key));
        const newDatos = datos.filter(item => {
            return multipleFiltrado(item, filtrosAplicadosKeys, filtrosAplicadosValues);
        })
        return {
            datos: separarDatos(newDatos, types),
            filtros: disableFilterOptions(newDatos, filtros)
        }
    }
    return {
        datos: separarDatos(datos, types),
        filtros: disableFilterOptions(datos, filtros)
    }
}
const disableFilterOptions = (datos, filtros) => {
    return filtros.map(filtro => {
        const newOptions = [...new Set(datos.map(item => item[filtro.key]))];
        return {
            ...filtro,
            options: filtro.options.map(option => {
                return {
                    ...option,
                    disabled: !newOptions.includes(option.key)
                }
            })
        }
    })
}

export const filterByValue = (array, value) => {
    return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
}