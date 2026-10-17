import oceanCityHero from "../assets/projects/banner.png";
import oceanParkAerial from "../assets/projects/phankhu.png";
import oceanParkMasterplan from "../assets/projects/phankhu.png";
import zoneCard from "../assets/projects/phankhu.png";
import type { ProjectData } from "../types/project";

export const project: ProjectData = {
  id: "vinhomes-ocean-park-3",
  name: "VINHOMES OCEAN PARK 3",
  tagline:
    "Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.",
  heroImage: oceanCityHero,
  zones: [
    {
      id: "zone-1",
      name: "PHÂN KHU 1",
      image: oceanParkAerial,
      units: "2500 Căn",
      area: "Từ 50m² đến 191,5 m²",
    },
    {
      id: "zone-2",
      name: "PHÂN KHU 2",
      image: zoneCard,
      units: "2100 Căn",
      area: "Từ 60m² đến 200 m²",
    },
    {
      id: "zone-3",
      name: "PHÂN KHU 3",
      image: oceanParkMasterplan,
      units: "1980 Căn",
      area: "Từ 56m² đến 180 m²",
    },
    {
      id: "zone-4",
      name: "PHÂN KHU 4",
      image: oceanCityHero,
      units: "2250 Căn",
      area: "Từ 65m² đến 210 m²",
    },
  ],
};
