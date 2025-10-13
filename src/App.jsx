import { useEffect } from "react";
import { bottomBar, topBar } from "./state/store";
import { CiSearch } from "react-icons/ci";
import Button from "./Components/Button";
import Specialization from "./Pages/onboarding/Specialization";
import ResourceCard from "./Components/ResourceCard";
import { useNavigate } from "react-router";
function App() {

  const useBottomBar = bottomBar((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    
    useBottomBar.setActive(true);
  }, []);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const skills = [
    { label: "React", image: "/assets/reactImage.svg" },
    { label: "Node js", image: "/assets/nodeImage.svg" },
    { label: "Collaboration", image: "/assets/collaborationImage.svg" },
    { label: "SQL", image: "/assets/sqlImage.svg" },
    { label: "Figma", image: "/assets/figmaImage.svg" },
    { label: "Co-operation", image: "/assets/co-operationImage.svg" },
  ];
  const resources = [
    {
      postedby: "name surname",
      type: "document",
      images: [
        "https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg",
        "https://images.pexels.com/photos/2539151/pexels-photo-2539151.jpeg",
      ],
      userImage:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAyQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABBEAABAwIEAwYDBQUFCQAAAAABAAIDBBEFEiExE0FRBhQiYXGBIzKRQlJyscEkJTOh0RU0NUXwFlNic4KSsuHx/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAJxEAAgICAgIBAwUBAAAAAAAAAAECEQMxEiEyQQQiQlETM2GB0XH/2gAMAwEAAhEDEQA/APMKgfEb6LY4LFFJgWV43YslUttI30WipJXQ4Bdp2jVCfsy1XAIK4sb8ocLIniLP2Jp8whcrjJOHHe4RzEWHuA06IMZGaa2zwrWYC2qhAtI1SSiwuklG0VhKmSB6eHofxiCnCbzUOJ08kEQVI1yGip03XRU25rcQ8kFmvFkZ7MsEteCeSyXeT1Wv7C+OsBdaxsmiqJTdnt/Zqk4NGx3NwuUVnsCFFhmUU0eTbKE6reGjdOyKLEewTiq1LJmYCp7pkKdXHLl0ibogKtTsqeYq7VbKjZAJ3MuE3SSWMK6V0kljHClddXFjHzbUi72+iOQ69nz/AMsoPUN8Q9EZgH7hP4Cq+iS2Zq3xR6rcnCm1WEaXva6xNvir03BpGDDQHHkEGMjzKqpnU1UI3g3B5plS3wBaDtRwn1YyWzAoLUM8CWWhobA5GpXQPJSFmpXQxROmhgbfkpWRZjYC6cxg57K9BCQwEjf+aF0YjpqRuYEjMfurQYX3mAg04EfoEPi+GRZaDCntlLQ8aWSPIykcSfZqsKx7GqXK0Sl7SNntBWwwzGTWFsNextPMbZfuu/osdQ2aG3N7bLQ080cgyyNBFuidOxJwo18bAwWCmCH4bMTG2J7iS0WaSd1faRsqROdo6UkiQmkphSCp2VNXJ9WqogE5ZcsurqBhqS6uLGEkkkiY+cqj5x6I1Ta4G78BQipHiafJGaQfuN34SqPRNbM0B8QLaxyOZhwsdMqxoHxAtf8A5aPwLMy2ZWrzSVt3XJsmzN+GppR+2eyU7bRoPQ0dgZw8RTmhOI8R9V1rbrnOwmghMjg0AnVFpYQ1lxuFRoPDJ0HWyKVRDDYjw2F0GKtlNrXHYE+iL4U0tsXkgIPHJM+Qlr2xNvbVECyppIhMaqOWPm0HUKTRdSSNvRxtIbZ99OqLUrbi4cbrEYNibp5AGE6a5R0RCfGqmmc0QZXOvoHIqRpI9DpJ3MyAHXZXm12WoDbmxWWwfFZ5ntjroOGXfK4bI04gVLRzur43Zy5VRo4nZm3ScmU58HspHWVCKIZvlVRWpyAw+SHtlaX2ulbCSpXUrGZhdcMRvoFjESVtVZbT9QpIKdpdchExTK5Y9EW7uzol3dnRAx8xVIvl9EYpB+5HfhKFVO7PRFqPXBn+hVX4k15Gd+2Frv8ALR+BZMDxBa3/ACsfhWZomZkH7WD5Ls7fhrr9aoeifMPhoPQY+QHLfEU5rU8jxFdaFyncialP7YGsF482UnzCvYk3xC99UNpZOHWthFrmQyXI3HT+aK1MrDNlPIaoM1dlEYQ6cZ/FIOYLyNFdmo4xTN+AGhoy6ON7efVWKedsUBe75eXmh82KsFU41QPCDdAG3SJyZVqKNL2BpeHMWXuHtIBUOO9mqw4gZGzzcPNoWWNvYpnZTGqNkjzHIxobsHnLZa2txqmxCn75h8+d8BAfCW+F4/0Fl1szr0RdnI69jGxvmbUsHJ7crm+6207WtBkcfEs/gOI0lXYxtyOI1Co9pu0LqWonpm6ZdL3T8lFWc+b+TbYdWGYabbXV8vtuvLuz3a1tOwtnJOvIrQzdsaYwFzHEkBOsq9nP0aarqG8NwB1QR0rjL4UOwXFXYtK67zlHJGjT2NwpTk32UjVBHD3F9gSi7I2rP0b3Ry67LQwOu0FWhK0I12Oe0Bm2ygZIG7K27UKqYhfYJwDuMF3ihRuisFHZYJ82VOpb6ItRf4Q/0KFVG7fRFKH/AAh48iqvxJLyAI+Za0D91/8ASsk0eJbCnYZqFkTfmeLBZgiZlw/a/ZSTD4auYnhc1BPG+TVjtAbW1VSb+Gg+0GPU+wY5viKc1qTvmKc265Tvsc+AZWysaDMDz5aW0Xapp70+251sporqKveWVWb0QN7KGI4i9rWRMvmaPZU4eJM+5kOvIC6irXjvRvtfruilNJlZdttdk9JLoW7fbCWGUp4ZMbpGObqHOi3WqpMTMVMYpnRyRgai2Vw9AgODY3iMYEUVIX22Av8A0WorKiPEsKkjxekY2Qs8OYWLT5FKP1XRHgoNPibZI3fBfrbzVTtIO919USfFnIPspuyhDaBhqiGNjc5xeTazRzP0QaPEW1lRPMQRxZHPyk6i5upziQzStIq0tHI1xsdLojEQ1rY3fOTYBRio4TtrtKqT1g44INrG4Km7kQR6b2TwsUcJkMgu/XZHpqlrXBui8+ou1dRHA1jY2lx0uSjNBPU1dpJz52CdySVFYs1McrSQRZGaGfM0C6x4mEY1JV/DsUyuaEYTpjSRsgbhRm11Uir2PbqdU0z8R3hvZdHKyZesHhc4IXIHeDXdS3TIx8v1B1YidEf3XJ6FC5vsolRH92v91X7SP3AUfMFtcAcM1KD94LFDdbDAj8ak/EFpaNHZd7dgCGlsPtn8lkJP4a2PbrWCl/GfyWPkHgSxX0DP9wH/AGintCWW7lNFE55OUDKBcuOgHuoUdh1psPJVcSe2SS7Te4BB9k6oq6djXRxyCSW1jl2+qFtmzRsjJ8Ubct+oGx+iMoNKxFNSlSI5IhI5tib31AG6szNfSQsc5oYfteMa/wCtVExzo3h7dCOie55naA/MX/fJRjJUCUWn0WIMXdDoxzm6g3JsjNJV1mJ2jfmkyi49D/8AEEoMMfPOchuCfqvQuzuCwUPDMnicBYvdYWRuKMubBOJNFPCcOZIbWHEGu+9kEbA+GW4W1rsIfiOJPmo3saZLvyvNhYDe/pZRt7HYmDI6r4MLWMe8vL7i7QTb3sdfJTljdkW3IAwATNFyAVVrKQFwDSL36rS1nZSvp5nthkglgY7I6VrtnZWm1upzj6FUZ+z9TDYmSN0mxDX3trY8uvT2up/psyiTYNRHIHPAIC1FNKImZRospFgdeHOaHAOYLubmdcNuRewHUEdfLZWGUtTRNb3p9nO+Vtyf57IfpP8AJROjSPmzcwlFU8Ig9PNAOKev81ziE8z9UHjDys17sXBZYGx9UZwTEWTgMzeIarzYyEDcqWkqnQyZmuIJ800E4sWz2Vkg0tron8TyK87pKx0jB8V17feVrjP/AN47/uXQjHj0hvlRGiI/s5/uhrtQ1X6T+4P91f0c1/UC2/MtZgQJlpSBoHhZNg1WswaUQMhkfo1jgSfJB9oaPl2EO2xvBTDnn/RZYMLhyHm42CL9qMbp6vJHC3Pk1zHa6ydVXPe7O7Ut6aD6bKkMT40xJ5PqtD56mkgBLTx3322aP1KFVlbNUjK95DAfC0bBOqwc+doFnC6qPBvdMsajo3Ny2yCKQtnO+qllvmzMNiFG+Mh4c0bjRPFiM3JJXpj3XaLNPKJdHaP6IhSxtuM7bA80LsG2JHK6MUZzwB8bgS3cFcuXE4q0deDKpdM1GDQxxR5mAE9bIg6ubK8UsLgb/wAR3l0WXoqt9XVto2yGO7Sel7ckWpAG17A0ZWRAtKp8X4/J85EvmfJUfoiaGHEJ6XEmd1ZE97GPMhke5oZHl1Nxc8+QVih/2jqZwRT8OJ0pazIG8MNdy65bO59eqydbPM2qqKmmldG+LK8FjrEB1x+iLwVVfHKWirmGcB2khte2/roF0ODvRyrIkthWsfjEkkVDkjbPKRPxc+rw1py3aL7AO5XPshVVT9oY5zF3SoDn3YTZuVwcXXHv4t1TFTiE4e9tXKHwktzGQ6f6ufqqVOMYraxxixKZro2jUzu01NvzP1KR4X+B45UaDgdoTB3SSCON7RfPKCS4OcfCGAEXJzDbYaqxTYJjNRSM4kBBu52Twi5AHTc2Nh6EaWQaBmNxyl7q7MbWzmZ1977+q1mCQVs9O21cc45GR2vpp0CjLHJFFkjICuwTFLtHcpRm2JtYgbnzVKspaqgmEVVE6NztW3+0Fr34PinKsfmN72lda3RC5cErZH5qh/ELToXOJUqKUCXU5cy+qbT0kj5ALGy0IwuYNtmj+qs0eC1BeC0x263P9FqDRUpKcw21Oqu3VmqwqqZHcOjvyAJ/oqP9m4l90fVOugM8n5NRCm0on+6HjYIhTf3N3uuj0c33AyLV2ymqcSkaGxsPgbppz9VT7wIGWOmbmEyTK5meM3a77QVccbJTZLfiPcM3ivcBMfHmuduRXCxxYHu1PXmFLTPE5IdYPAs7z81bZJ/wUgwvikhPzt1b5hVywGMHblZXqkcKSObk11nemyY+HLLJHyIzNStDp+yo1uaJh+64tUeQMcQR4d/QK1TNuZougzALjvA+KQ/KRZ3oUrj7H5V0V2tc9xjt4QLlx2UUFS+KqBY4ho0t1Cvd3MGZjrOYfCRblyVSdhizZxmA+bzHUJJR6HhJWH6WCR2H4fXUpDqht3httzfUHytojNLVMrpn90y5bHjAuGaJ3QhC+zdWG4KXNaA9rjG3T+abSUzI7zR3bLzcDuDuPyVYJ8U0Qm7k1Iuumbmr/u5I2+uj0UbP4oxc/I38lnmuvR17r7zNaD6D/wBopM/K9h6MVURZPTTXdWPvoX/on4NMIqern5ueRf0QyKfLSgc3uJKVFNfDpGgjxSO/NAyDctS9sMYYfHKQAtDQVLoGjK46aMtztzWLoanPGS8i0BI97IxS1LnRNN/E9oAHqg1aGi6Z6jgdVHiVMHPGWS17X3CdX07AwhoF1nez1Z3aWPL8rRlWkZIKh51HouDJCmehim5ICdzqXvOXX1RyghfFE1rhrbVWo4Ws5XKmGUclKitkDmZt9U7Tonvd0TbnolabGTSPnJ0bo7ZuavUulG8ev5IzX9ma97GZGxGzraSDXUjTqbgiyqT4XU4dSHvPDGZzm+B4dqLX/NdKfRyOLuzHV58DR5KtRVLqeThyaxP3vyUlWTxTcaclEGtlBB5q0V7QnT2F6ctla6Pna6hmDqdzZx8zXa+iq4dMYaxkch52v1RetiDonAcwrp2rINcWQ1zWviNrZXtuFWidxKenmN7s8DlJQycahfE7V8fJQ4ec3eoDv87R5oXdBrqvwJo4dfG77L7tPuu1MPwnR21aSlVAmJsjd22KtzfEDZBtI0FYzemQxkT0UclrkDKUOrSAy53HNXKC4dUU+2mdoVdzBLX00btnyNv6JZaGivqDdBD3XD6aJhGx4gO4dz/VPa+0J9vyTq1570SOZ2VR8loXE8nO/NOlxVEpPk7HQeLB3nnJUE/oiNQdT+EIdAMuD0jfvEu+pVqd+p9EVoEtkJOsLB01UFNMY6F8l9A9ylj/AIjncmtQuKUPwOoHPi2HuUG6HjGwnhrndxN/mmcT9dB+qN0U4kq2AHwxtJ+myz8T+HSNN/tWHsLfoiGGSltO6QmzpXWH4QitCS2bXCKgl/QXRaSqqKPEnSsJdFI1rsl+drH8lmcLk+IxnufRH8SkHcYpRo4Aj2uuf5Eejp+NLujRUPaCKQ2OhG4KMRV0UoBa4aryqDEowHcQ2crOB4qX4mGiU5HbC65avR3RS9nqXFHRLiDoqUEgdE035J+bzWoRtHieI1E8MERimkYT91xHI/1P1KhimlnpnumlfI651e4kpJJ1o55N8jL1DjxG31BJGvsq8zGskNuiSS6I6JvYyp1hbJ9sHQrRUzjLQxvfqSNVxJPDYmXxQLoSWYm9rdATsnUvhxtoGxBB/mkksjPb/wCE5AtMy1wLqSm1w+G/K4/mkknWxHors8OLQEc7g+iiYB/bdIP+I/kUkkktFY7/AKClUSXA+ao1RIppLfeckknZGBd2pKIchE3RS1egdboupIrQHshj/gSnnwyg2GgHDZwdhK3/AMgkkkybLY/8JZnHusWv2bo1EbPpo/sgNICSSaIkzRYMbzSu5jT2WikHFoZS/Ute0D6JJKebQ2DyMxisEYBIFlUwclldCWnUO3XElzYPI6vlftnsWH607b9FZyhJJK9iw8T/2Q==",
      link: null,
      specialization: "abc",
      likes: 2,
      postTime: "2023-01-01 19:25:03",
      liked:true
    },
    {
      postedby: "name surname",
      userImage:
        "data:image/jpeg;base64,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",
      type: "ytLink",
      images: null,
      link: "https://youtu.be/KBbJy-jhsAA?si=mDyjvGDESNR_ADEc",
      specialization: "",
      likes: 2,
      liked:false,
      postTime: "2023-12-06 19:25:03",
    },
  ];

  return (
    <div className="space-y-[40px]">
      <div className="bg-gradient-to-b from-secondary from-50%  to-background px-[20px] pt-[30px]">
        <div className="H-26 font-bold ">
          Welcome, {userDetails?.fullName}
          <br />
          Get Certificate By Skillset
        </div>
        <div className="flex items-center gap-[10px] mt-[20px]">
          <input
            type="text"
            placeholder="You can search certificate by skills"
            className="w-full h-[40px]  px-[25px] rounded-[10px] bg-white py-[25px] focus:outline-none focus:ring-background focus:ring-2"
          />
          <button className="p-[12px] rounded-[10px]  bg-white">
            <CiSearch className="text-[25px] text-primary font-semibold" />
          </button>
        </div>
      </div>
      {/*Skills*/}
      <div className="px-[20px] space-y-[20px]">
        <div className="H-18 font-bold ">
          Choose A Skill For Earning
          <br />A Certificate
        </div>

        <div className="grid grid-cols-3 gap-[10px]  w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-[5px] px-[10px] py-[15px] rounded-[10px] bg-white border border-white  smallShadow"
            >
              <img
                src={skill.image}
                alt={skill.label}
                className="w-[50px] h-[50px]"
              />
              <p className="H-14 font-bold truncate">{skill.label}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto w-[130px]">
          <Button text="View More" onClick={() => navigate("/skills")} />
        </div>
      </div>
      {/*Resources*/}
      <div className="px-[20px] space-y-[20px]">
        <div className="H-18 font-bold ">Resources</div>
        <div className="flex flex-col gap-[20px]">
          {resources.map((resource, index) => (
            <ResourceCard key={index} data={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
