import { useSessions } from '@/store';
import { Building } from '@/types/api';
import { Location, LocationIndex, Visit } from '@/types/course';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const useCourse = () => {
  const [locationName, setLocationName] = useState('광화문');
  const [locationIndex, setLocationIndex] = useState<LocationIndex>([0, 0]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [locationId, setLocationId] = useState(1);
  const [lastId, setLastId] = useState(0);
  const { sessions, course, isStorage, setCourse } = useSessions();
  const params = useParams<{ sessionId: string }>();
  const sessionId = useMemo(() => Number(params.sessionId), [params.sessionId]);

  useEffect(() => {
    if (!isStorage) return;
    if (!!course[sessionId]) return;

    const filter = sessions.filter(
      (session) => session.session_id == sessionId
    );
    if (filter.length == 0) return;
    if (!filter[0].routes[0].buildings) return;

    const buildings = filter[0].routes[0].buildings;
    let rows: Building[][] = [];
    const row1: Building[] = [];
    const row2: Building[] = [];
    const row3: Building[] = [];
    let tour: Location[][] = [];

    buildings.forEach((building, i) => {
      if (i < 5) row1.push(building);
      if (i > 4 && i < 10) row2.push(building);
      if (i > 9 && i < 15) row3.push(building);
    });

    rows = [row1, row2, row3];
    tour = rows.map((row) =>
      row.map((col) => {
        return {
          id: col.building_id,
          name: col.name,
          visited: false,
          coordinate: col.coordinate,
        };
      })
    );

    tour[1].reverse();
    tour[0][0].visited = true;

    setLocationId(tour[0][0].id);
    setCourse({ sessionId: sessionId, course: tour });

    const lastRow = tour.length - 1; //2
    const lastCol = tour[lastRow].length - 1; //4
    const lastId = tour[lastRow][lastCol].id;

    setLastId(lastId);

    // let counter = 0;
    // const list: Course = [
    //   ['광화문', '흥례문', '근정문', '근정전', '사정전'],
    //   ['수정전', '경회루', '강녕전', '교태전', '아미산 굴뚝'],
    //   ['소주방', '자경전', '십장생 굴뚝', '향원정'],
    // ].map((row, rowIndex) =>
    //   row.map((name, colIndex) => {
    //     counter++;
    //     return {
    //       id: counter,
    //       name,
    //       visited: false,
    //       coordinate: [0, 0],
    //     };
    //   })
    // );
    // list[1].reverse();
    // list[0][0].visited = true;

    // setCourse(list);

    // const lastRow = list.length - 1; //2
    // const lastCol = list[lastRow].length - 1; //4
    // const lastId = list[lastRow][lastCol].id;

    // setLastId(lastId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, sessions, isStorage]);

  const visitLocation: Visit = (location, rowIndex, colIndex) => {
    setLocationId(location.id);
    setLocationName(location.name);
  };

  /**
   * @deprecated
   */
  // const handleNext = () => {
  //   const nextId = locationId + 1;

  //   course.forEach((row, rowIndex) => {
  //     row.forEach((col, colIndex) => {
  //       if (nextId == lastId) {
  //         setNext(false);
  //       }
  //       if (col.id == nextId) {
  //         setLocationId(nextId);
  //         return;
  //       }
  //     });
  //   });
  // };

  return {
    course: course[sessionId] || [],
    locationName,
    locationId,
    lastId,
    prev,
    next,
    visitLocation,
  };
};
