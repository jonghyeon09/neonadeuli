import { Course, Location, LocationIndex } from '@/types/course';
import { useEffect, useState } from 'react';

export const useCourse = () => {
  const [course, setCourse] = useState<Course | [][]>([[]]);
  const [locationName, setLocationName] = useState('광화문');
  const [locationIndex, setLocationIndex] = useState<LocationIndex>([0, 0]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [locationId, setLocationId] = useState(1);
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    let counter = 0;
    const list: Course = [
      ['광화문', '흥례문', '근정문', '근정전', '사정전'],
      ['수정전', '경회루', '강녕전', '교태전', '아미산 굴뚝'],
      ['소주방', '자경전', '십장생 굴뚝', '향원정'],
    ].map((row, rowIndex) =>
      row.map((name, colIndex) => {
        counter++;
        return {
          id: counter,
          name,
          visited: false,
          coordinate: [0, 0],
        };
      })
    );
    list[1].reverse();
    list[0][0].visited = true;

    setCourse(list);

    const lastRow = list.length - 1; //2
    const lastCol = list[lastRow].length - 1; //4
    const lastId = list[lastRow][lastCol].id;

    setLastId(lastId);
  }, []);

  const visitLocation = (location: Location) => {
    console.log(location);
    // const copyCourse = course.map((row) => [...row]);
    const visited = course.map((row) =>
      row.map((col) => {
        if (col.id === location.id) {
          col.visited = true;

          setLocationId(col.id);
          setLocationName(col.name);
        }
        return col;
      })
    );
    console.log(visited);

    setCourse(visited);

    // for (const el of copyCourse) {
    //   console.log(el);
    // }
    // visited[rowIndex][colIndex].visited;

    // setCourse(visited);
    // setLocationName(visited[rowIndex][colIndex].name);
    // setLocationIndex([rowIndex, colIndex]);
  };

  /**
   * @deprecated
   */
  const handleNext = () => {
    const nextId = locationId + 1;

    course.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (nextId == lastId) {
          setNext(false);
        }
        if (col.id == nextId) {
          setLocationId(nextId);
          return;
        }
      });
    });
  };

  return {
    course,
    locationName,
    locationId,
    lastId,
    prev,
    next,
    visitLocation,
  };
};
