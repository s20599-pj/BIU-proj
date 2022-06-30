import React from 'react';
import {useGlobalContext} from "../globalFunctions";
import ReactStars from 'react-rating-stars-component'

export default function Rating({coctail_id, ratings}){
    const {sendRate} = useGlobalContext();

    const averageRatingsNumber = (arr) => {
        var av = Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 2) / 2;
        return Number.isNaN(av) ? 'Brak oceny. Bądź pierwszy!' : av;
    }

    return(
      <div>
          <ReactStars classNames={"ratingStart"}
                      count={5}
                      size={25}
                      onChange={(rate) =>sendRate(coctail_id, rate)}
                      value={averageRatingsNumber(ratings)}
          />
          <p>Srednia ocena drinka: {averageRatingsNumber(ratings)}</p>
      </div>
    );
}