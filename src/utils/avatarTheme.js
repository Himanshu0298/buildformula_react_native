import {useState, useEffect} from 'react';
import * as React from 'react';

const getHashOfString = str => {
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // tslint:disable-next-line: no-bitwise
    hash = str.charCodeAt(i) + ((hash < 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash, min, max) => {
  return Math.floor((hash % (max - min)) + min);
};

const generateHSL = (name, saturationRange, lightnessRange) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, 0, 360);
  const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
  const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
  return [h, s, l];
};

const HSLtoString = hsl => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

const generateColorHsl = (id, saturationRange, lightnessRange) => {
  return HSLtoString(generateHSL(id, saturationRange, lightnessRange));
};

const getInitials = user => {
  return `${user.name.first[0]}${user.name.last[0]}`;
};

const setValue = functionFor => {
  return e => {
    const value = parseInt(e.target.value, 10);
    functionFor(value);
  };
};

const getRange = (value, range) => {
  return [Math.max(0, value - range), Math.min(value + range, 100)];
};

const fetchUsers = () => {
  return fetch('https://randomuser.me/api/?results=14&inc=name,email').then(
    response => response.json().then(json => json.results),
  );
};

const AvatarTheme = props => {
  const [users, setUsers] = useState([]);
  const [range, setRange] = useState(10);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [theme, setTheme] = useState('Light');

  useEffect(() => {
    fetchUsers().then(usersList => setUsers(usersList));
  }, []);

  const saturationRange = getRange(saturation, range);
  const lightnessRange = getRange(lightness, range);

  return (
    <div className={`app ${theme}`}>
      <h1>Avatar Color Generator</h1>
      <div className="inputs">
        <div className="singleInput">
          <span className="inputLabel">Theme</span>
          <select value={theme} onChange={e => setTheme(e.target.value)}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
        <div className="singleInput">
          <span className="inputLabel">Saturation</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={saturation}
            onChange={setValue(setSaturation)}
          />
          {saturationRange[0]} - {saturationRange[1]}
        </div>
        <div className="singleInput">
          <span className="inputLabel">Lightness</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={lightness}
            onChange={setValue(setLightness)}
          />
          {lightnessRange[0]} - {lightnessRange[1]}
        </div>
        <div className="singleInput">
          <span className="inputLabel">Range</span>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={range}
            onChange={setValue(setRange)}
          />
          {range}
        </div>
      </div>

      <div>
        {users.map((user, index) => {
          const userName = `${user.name.first} ${user.name.last}`;
          const color = generateColorHsl(
            userName,
            saturationRange,
            lightnessRange,
          );
          const initials = getInitials(user);
          return (
            <div className="row" key={index}>
              <div
                className={`avatarColor ${theme}`}
                style={{backgroundColor: color}}>
                {initials}
              </div>
              <div className="userName">{userName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarTheme;
