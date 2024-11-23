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

        const handleBackButtonClick = () => {
          navigate(-1);
        };
    
        tg.onEvent('backButtonClicked', handleBackButtonClick);
        console.log('Обработчик события "backButtonClicked" установлен!');
    
        return () => {
          tg.offEvent('backButtonClicked', handleBackButtonClick);
          console.log('Обработчик события "backButtonClicked" удалён!');
        };
      } catch (err){
        console.log(err);
      }
    }, [navigate]);

    useEffect(() => {
      if (location.pathname === '/') {
        tg.BackButton.hide();
      } else {
        tg.BackButton.show();
      }
    }, [location.pathname]);
};

export default BackButton;