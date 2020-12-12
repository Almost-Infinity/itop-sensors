import { useState, useEffect } from 'react';
import { of, zip } from 'rxjs';
import { catchError, delay, expand, map, mapTo, tap, timeout } from 'rxjs/operators';

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

    const arr2obj = (arr) => arr.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.data }), {});

    const main$ = zip(
      getSensor('A'),
      getSensor('B'),
      getSensor('C'),
      getSensor('D')
    ).pipe(
        map(arr2obj),
        tap((state) => setSensorsData(state)),
        expand((state) => {
          Array.isArray(state) && setSensorsData(arr2obj(state));

          return zip(
            getSensor('A'),
            getSensor('B'),
            getSensor('C'),
            getSensor('D')
          )
        })
      );

    const subscription = main$.subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return sensorsData;
};

export { useSensor };