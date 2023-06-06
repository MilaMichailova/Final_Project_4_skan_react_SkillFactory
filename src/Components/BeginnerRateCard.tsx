import { observer } from "mobx-react-lite";
import logoCardBeginner from "../asets/images/logo-beginner-card.svg";

const BeginnerRateCard = () => {
  return (
    <div className="cardWrapper cardWrapperBeginner">
      <div className="cardTitlewrapper cardTitlewrapperBeginner">
        <div className="textCard">
          <div className="cardTitle">Beginner</div>
          <div className="cardSubtitle">Для небольшого исследования</div>
        </div>
        <img
          className="logoCard"
          src={logoCardBeginner}
          alt="logo Card Beginner"
        ></img>
      </div>
      <div className="priceCardWrapper ">
        <div className="activeTarifeBage">Текущий тариф</div>
        <div className="priceWrapper">
          <div className="priceOfYear">
            799 ₽<div className="saledPrice">1 200 ₽</div>
          </div>
          <div className="priceOfMonth">
            или 150 ₽/мес. при рассрочке на 24 мес.
          </div>
        </div>
      </div>
      <div className="includedInTariffWrapper">
        В тариф входит:
        <ul className="includedInTarifTitle">
          <li className="includedInTarifPoints">
            Безлимитная история запросов
          </li>
          <li className="includedInTarifPoints">Безопасная сделка</li>
          <li className="includedInTarifPoints">Поддержка 24/7</li>
        </ul>
      </div>
      <button className="grayButton therdButton secondsryButton">
        Перейти в личный кабинет
      </button>
    </div>
  );
};

export default observer(BeginnerRateCard);
