import React from "react";
import Card from '../cards'

const Body = ({dataSource, setModal}) => {
    return (
        <div className='body-content'>
            {dataSource.map(element => (
                <div key={element.key} className="container">
                    <h2>{element.title}</h2>
                    <div className="card-group">
                        {element.options.map(item =>
                            <Card
                                key={item.id}
                                onClick={(data) => setModal(data)}
                                {...item}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Body;
