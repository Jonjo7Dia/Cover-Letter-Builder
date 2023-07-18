import styles from "styles/component/hero.module.scss";
import money from "assets/icons/Money.svg";
import clock from "assets/icons/Clock.svg";
import key from "assets/icons/Key.svg";
import person from "assets/icons/Person.svg";
import Image from "next/image";
import { useState } from "react";

type iconLogo = {
  source: object;
  title: string;
};

const HeroIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const icons: iconLogo[] = [
    { source: person, title: "Personally Generated" },
    { source: money, title: "Save Money" },
    { source: key, title: "Target Keywords" },

    { source: clock, title: "Save Time" },
  ];
  return (
    <div className={styles["hero__icons"]}>
      {icons.map((icon: any, index: number) => {
        return (
          <div className={styles["hero__icon-wrapper"]} key={index}>
            <Image
              src={icon.source}
              alt={`${icon.title} icon`}
              className={styles["hero__icon"]}
              onMouseOver={() => {
                setHoveredIcon(index);
              }}
              onMouseOut={() => {
                setHoveredIcon(null);
              }}
            />
            <div
              className={`${styles["hero__icon-info"]} ${
                hoveredIcon === index ? styles["hero__icon-info--visible"] : ""
              }`}
            >
              {icon.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroIcons;
