import './App.css';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { CSVLink } from 'react-csv';

function App() {
  const [data, setData] = useState({ titles: null, credits: null });

  const generateData = () => {
    const titles = [];
    const credits = [];

    for (let i = 0; i < 100; i++) {
      const id = i + 1;
      const isSeries = faker.datatype.boolean();

      const title = {
        id: id,
        title: faker.music.songName(),
        description: faker.lorem.paragraph(),
        release_year: faker.date.past({ years: 50 }).getFullYear(),
        age_certification: faker.helpers.arrayElement(ageCertifications),
        runtime: isSeries ? faker.number.int({ min: 240, max: 43200 }) : faker.number.int({ min: 60, max: 240 }),
        genres: faker.helpers.arrayElements(movieGenres, { min: 1, max: 5 }),
        production_country: faker.location.countryCode('alpha-3'),
        seasons: isSeries ? faker.number.int({ min: 1, max: 12 }) : null,
      };

      titles.push(title);

      for (let j = 0; j < faker.number.int({ min: 5, max: 20 }); j++) {
        const credit = {
          id: i * 100 + j,
          title_id: id,
          real_name: faker.person.fullName(),
          character_name: faker.person.firstName(),
          role: faker.helpers.arrayElement(roles),
        };

        credits.push(credit);
      }
    }

    setData({ titles, credits });
  };

  return (
    <div>
      <button onClick={generateData}>Generate Synthetic Data</button>
      {data.titles && (
        <div>
          <CSVLink
            filename="titles.csv"
            data={[Object.keys(data.titles[0]), ...data.titles.map(item => Object.values(item))]}
          >
            Download Titles CSV
          </CSVLink>
        </div>
      )}

      {data.credits && (
        <div>
          <CSVLink
            filename="credits.csv"
            data={[Object.keys(data.credits[0]), ...data.credits.map(item => Object.values(item))]}
          >
            Download Credits CSV
          </CSVLink>
        </div>
      )}
    </div>
  );
}

export default App;

const ageCertifications = [
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17',
  'U',
  'U/A',
  'A',
  'S',
  'AL',
  '6',
  '9',
  '12',
  '12A',
  '15',
  '18',
  '18R',
  'R18',
  'R21',
  'M',
  'MA15+',
  'R16',
  'R18+',
  'X18',
  'T',
  'E',
  'E10+',
  'EC',
  'C',
  'CA',
  'GP',
  'M/PG',
  'TV-Y',
  'TV-Y7',
  'TV-G',
  'TV-PG',
  'TV-14',
  'TV-MA',
];

const roles = [
  'Director',
  'Producer',
  'Screenwriter',
  'Actor',
  'Actress',
  'Cinematographer',
  'Film Editor',
  'Production Designer',
  'Costume Designer',
  'Music Composer',
];

const movieGenres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Short Film',
  'Sport',
  'Superhero',
  'Thriller',
  'War',
  'Western',
];
