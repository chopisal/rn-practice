import List from "../Screens/List";
import SalonList from "../Screens/SalonList";
import TravelList from "../Screens/TravelList";
import PhotographyList from "../Screens/PhotographyList";
import CardsList from "../Screens/CardsList";
import CarsList from "../Screens/CarsList";
import AccordionMenu from "../Screens/AccordionMenu";
import UrbanEarsList from "../Screens/UrbanEarsList";

export default [
  { name: "List", label: "Vacation", component: List },
  { name: "SalonList", label: "Salon", component: SalonList },
  { name: "TravelList", label: "Travel", component: TravelList },
  { name: "PhotographyList", label: "Photography", component: PhotographyList },
  { name: "CardsList", label: "CardsList", component: CardsList },
  { name: "CarsList", label: "Cars", component: CarsList },
  { name: "AccordionMenu", label: "AccordionMenu", component: AccordionMenu },
  { name: "UrbanEarsList", label: "UrbanEars", component: UrbanEarsList },
];
