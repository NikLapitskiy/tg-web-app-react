import React, {useEffect} from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';

const BackButton = ({onClick}) => {
    const {tg} = useTelegram();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      try{
        if (!tg || !tg.BackButton) {
            console.error('Telegram WebApp не доступен');
            return;
          }

        // const handleBackButtonClick = () => {
        //   navigate(-1);
        // };
    
        tg.BackButton.onClick(() => {
            console.log('Кнопка "Назад" нажата!');
            onClick(); // Вызываем переданный обработчик
          });
    
        return () => {
            tg.BackButton.offClick(onClick);
            tg.BackButton.hide();
            console.log('Обработчик кнопки "Назад" удалён и кнопка скрыта');
        };
      } catch (err){
        console.log(err);
      }
    }, [onClick]);

    useEffect(() => {
      if (location.pathname === '/') {
        tg.BackButton.hide();
      } else {
        tg.BackButton.show();
      }
    }, [location.pathname]);

    return null;
};

export default BackButton;