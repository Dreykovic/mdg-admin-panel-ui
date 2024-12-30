import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/theme-slice';

const ThemeSwitcher = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const switchTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    dispatch(setTheme({ theme: newTheme }));
  };
  useEffect(() => {
    currentTheme === 'light' ? setChecked(false) : setChecked(true);
  });
  return (
    <>
      <ul className="list-unstyled mb-0">
        <li className="d-flex align-items-center justify-content-center">
          <div className="form-check form-switch theme-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="theme-switch"
              checked={checked}
              onChange={switchTheme}
            />
            <label className="form-check-label" htmlFor="theme-switch">
              Enable Dark Mode!
            </label>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ThemeSwitcher;
