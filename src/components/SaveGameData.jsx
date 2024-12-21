import { useGame } from "@/contexts/GameProvider";
import { landUpgradeCheck } from "@/helpers/editorData";
import { useKeyPress } from "@/hooks/useKeyPress";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const SaveGameData = ({ level, setLoader }) => {
  const router = useRouter();
  const [canUpgrade, setUpgrade] = useState(false);
  const { saveWorld, lands, userLevels } = useGame();

  const handleSaveGame = useCallback(async () => {
    setLoader(true);
    const currentGameData = level.getPlacementsData();
    console.log(currentGameData);
    const currCid = router.query.id;
    // console.log("currRoute : " + currCid);
    // console.log(currCid, lands, currentGameData)
    const newCID = await saveWorld(currCid, lands, currentGameData);
    setLoader(false);
    router.push(`/land/${newCID}`);
  }, [router.query.id]);

  const handleUpgradeLand = () => {
    level.editTileHeight();
    level.editTileWidth();
    const newWidth = level.getTileWidth + 4;
    if (userLevels && landUpgradeCheck(userLevels, newWidth)) {
      setUpgrade(true);
    } else setUpgrade(false);
  };

  useEffect(() => {
    if (
      userLevels &&
      level &&
      landUpgradeCheck(userLevels, level.getTileWidth)
    ) {
      setUpgrade(true);
    }
  }, [userLevels]);

  return (
    <div className="flex gap-2">
      {canUpgrade && (
        <button
          onClick={() => handleUpgradeLand()}
          className={`px-6 py-2 text-lg rounded-md border-2 transition bg-primary text-white border-black animate-fastPulse shadow-lg`}
        >
          Upgrade
        </button>
      )}
      <button
        onClick={() => handleSaveGame()}
        className="bg-secondary text-[#8A664E] ease-in duration-100 hover:scale-105 border-2 border-black rounded-md py-2 px-4"
      >
        Save
      </button>
    </div>
  );
};

export default SaveGameData;
