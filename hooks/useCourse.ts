import { Course, LocationIndex } from '@/types/course';
import { useEffect, useState } from 'react';

export const useCourse = () => {
  const [course, setCourse] = useState<Course | [][]>([[]]);
  const [locationName, setLocationName] = useState('광화문');
  const [locationIndex, setLocationIndex] = useState<LocationIndex>([0, 0]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [locationId, setLocationId] = useState(1);

  useEffect(() => {
    let counter = 0;
    const list: Course = [
      ['광화문', '흥례문', '근정문', '근정전', '사정전'],
      ['수정전', '경회루', '강녕전', '교대전', '아미산 굴뚝'],
      ['소주방', '자경전', '십장생 굴뚝', '향원정'],
    ].map((row, rowIndex) =>
      row.map((name, colIndex) => {
        counter++;
        return {
          id: counter,
          name,
          visit: false,
        };
      })
    );
    list[1].reverse();

    setCourse(list);
  }, []);

  const visitLocation = (rowIndex: number, colIndex: number) => {
    const visit = course.map((row) => [...row]);
    visit[rowIndex][colIndex].visit;

    setCourse(visit);
    setLocationName(visit[rowIndex][colIndex].name);
    setLocationIndex([rowIndex, colIndex]);
  };

  const handleNext = () => {
    const nextId = locationId + 1;
    const lastRow = course.length - 1; //2
    const lastCol = course[lastRow].length - 1; //4
    const lastId = course[lastRow][lastCol].id;

    course.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (nextId == lastId) {
          setNext(false);
        }
        if (col.id == nextId) {
          visitLocation(rowIndex, colIndex);
          setLocationId(nextId);
          return;
        }
      });
    });
  };

  return {
    course,
    locationName,
    prev,
    next,
    handleNext,
  };
};
