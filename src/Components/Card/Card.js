import React from 'react';
import './Card.css';
import Chip from '../Chip/Chip';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';

function Card() {
  return (
    <div className="card">
        <div className='card_top'>
            <div className='card_labels'>
                <Chip text ="Frontend" color="green"/>
                {/* <Chip close text ="Frontend" color="green"/> */}
            </div>
            <MoreHorizontal/>
        </div>
        <div className='card_title'>
          ducsid dsiisdah dsjod
        </div>
        <div className='card_footer'>
          <p>
            <Clock />
            5 June
          </p>
          <p>
            <CheckSquare/>
            1/4
          </p>

        </div>
    </div>
  )
}

export default Card