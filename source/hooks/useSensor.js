import { useState, useEffect } from 'react';
import { of, zip } from 'rxjs';
import { catchError, delay, expand, map, mapTo, timeout } from 'rxjs/operators';

const useSensor = () => {
    const [ sensorsData, setSensorsData ] = useState({});

  useEffect(() => {
    const getSensor = (name) => {
      return of(undefined)
        .pipe(
          delay(200 + Math.random() * (2000 - 200)),
          mapTo({
            name,
            data: Math.random().toString(36).slice(-8)
          }),
          timeout(1500),
          catchError(() => of(undefined).pipe(mapTo({
            name,
            data: null
          })))
        );
    };

    const main$ = of(undefined).pipe(
        expand((state) => {
          state && setSensorsData(state);
          return zip(
            getSensor('A'),
            getSensor('B'),
            getSensor('C'),
            getSensor('D')
          ).pipe(
            map((state) => state.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.data }), {}))
          )
        })
      );

    const subscription = main$.subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return sensorsData;
};

export { useSensor };