"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import {
  storeItem,
  getStoredArray,
  CITIES_PREFIX,
  getLastLevelAchieved,
} from "@/helpers/storage";
import { SCORE_TO_UNLOCK_LEVEL } from "@/helpers/score";
import GuessModal from "@/components/GuessModal/GuessModal";
import AlertModal from "@/components/AlertModal/AlertModal";
import ScoreHeader from "@/components/ScoreHeader/ScoreHeader";
import { getLevelImages, getNumberOfLevels } from "@/data/cities";
import Footer from "@/components/Footer/Footer";
import Image from "@/components/Image/Image";
import InfoIcon from "@/assets/InfoIcon/InfoIcon";
import InfoModal from "@/components/InfoModal/InfoModal";
import { useShowLevelInformationByDefault } from "@/hooks/useShowLevelInformationByDefault";
import { useShowLastLevelInfo } from "@/hooks/useShowLastLevelInfo";
import LastLevelInfoModal from "@/components/LastLevelInfoModal/LastLevelInfoModal";
import ShareLevelButton from "@/components/ShareLevel/ShareLevelButton";

const MAX_HINTS = 3;

const Level = () => {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [level, setLevel] = useState(params.level);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { showLevelInfoByDefault, setLevelInfoSeen } = useShowLevelInformationByDefault(level);

  const [storedCities, setStoredCities] = useState([]);
  const [score, setScore] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);

  const { showLastLevelInfo, setShowLastLevelInfo } = useShowLastLevelInfo(level, score);

  useEffect(() => {
    const stored = getStoredArray(CITIES_PREFIX + level);
    setStoredCities(stored);
    setScore(stored.length);
    setHintsLeft(MAX_HINTS);
  }, [level]);

  useEffect(() => {
    if (params.level !== level) setLevel(params.level);
  }, [params, level]);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [guessingCity, setGuessingCity] = useState({});

  const lastLevelAchieved = getLastLevelAchieved();
  const isInvalidLevel = parseInt(level) < 1 || lastLevelAchieved + 1 < parseInt(level);

  useEffect(() => {
    if (isInvalidLevel) router.replace("/play");
  }, [isInvalidLevel, router]);

  if (isInvalidLevel) return null;

  const images = getLevelImages(level);
  const nextLevelExists = getNumberOfLevels() !== parseInt(level);

  const onGuessModalClose = () => {
    setShowModal(false);
    if (typeof window !== "undefined") window.scrollTo(0, scrollPosition);
  };

  const onInfoModalClose = () => {
    setShowInfoModal(false);
    if (showLevelInfoByDefault) setLevelInfoSeen(level);
  };

  const addHit = () => {
    storeItem(guessingCity.imageName, CITIES_PREFIX + level);
    const newScore = score + 1;
    setScore(newScore);
    onGuessModalClose();
    setStoredCities([...storedCities, guessingCity.imageName]);
    if (newScore === SCORE_TO_UNLOCK_LEVEL) setShowAlertModal(true);
  };

  const handleInfoButtonClick = () => {
    setShowInfoModal(true);
  };

  const handleImageClick = ({ imageName, imageType }) => {
    setGuessingCity({ imageName, imageType });
    setScrollPosition(typeof window !== "undefined" ? window.pageYOffset : 0);
    setShowModal(true);
  };

  return (
    <div>
      <div className="main">
        <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <div className="hero">
            <div className="hero-headline flex flex-col items-center justify-center pt-2 pb-2 text-center">
              <h1 className="sticky bg-primary z-30 w-full py-3 px-3 flex flex-col gap-1">
                {/* Title row: info icon left, title centered, spacer right */}
                <div className="flex items-center">
                  <button
                    className="shrink-0 rounded-2xl bg-white cursor-pointer"
                    onClick={handleInfoButtonClick}
                    aria-label="Info"
                  >
                    <InfoIcon />
                  </button>
                  <span className="flex-1 text-center font-bold text-xl text-white">
                    {t("Level")} {level}
                  </span>
                  {/* Invisible spacer to keep title centered */}
                  <span className="shrink-0 invisible pointer-events-none rounded-2xl">
                    <InfoIcon />
                  </span>
                </div>
                {/* Score + bar + next level */}
                <ScoreHeader level={level} score={score} nextLevelExists={nextLevelExists} />
              </h1>
              <section id="photos" className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                {images.length > 0 ? (
                  images.map((image) => {
                    const isStored = storedCities.includes(image.image);
                    return (
                      <Image
                        key={image.image}
                        imageName={image.image}
                        imageType={image.type}
                        isStored={isStored}
                        onClick={handleImageClick}
                      />
                    );
                  })
                ) : (
                  <div className="flex justify-center text-white p-8">No images were found</div>
                )}
              </section>

              {score >= SCORE_TO_UNLOCK_LEVEL && (
                <div className="mt-6 mb-2">
                  <ShareLevelButton level={level} score={score} storedCities={storedCities} images={images} />
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {(showLevelInfoByDefault || showInfoModal) && (
        <InfoModal onCloseInfoModal={onInfoModalClose} level={level} />
      )}

      {showLastLevelInfo && (
        <LastLevelInfoModal onClose={() => setShowLastLevelInfo(level)} />
      )}

      {showModal && (
        <GuessModal
          imageName={guessingCity.imageName}
          imageType={guessingCity.imageType}
          addHit={addHit}
          onCloseModal={onGuessModalClose}
          level={level}
          isStored={storedCities.includes(guessingCity.imageName)}
          hintsLeft={hintsLeft}
          onUseHint={() => setHintsLeft((h) => Math.max(0, h - 1))}
        />
      )}

      {showAlertModal && getNumberOfLevels() !== parseInt(level) && (
        <AlertModal level={level} setShowModal={setShowAlertModal} score={score} storedCities={storedCities} images={images} />
      )}
    </div>
  );
};

export default Level;
