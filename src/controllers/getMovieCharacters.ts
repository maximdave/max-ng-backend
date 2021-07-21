import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { Character } from '../interface/interface';

export const getMovieCharacter = async (req: Request, res: Response) => {
  try {
    let name = req.query.sortByName as string;
    let height = req.query.sortByHeight as string;
    const gender = req.query.filterByGender as string;

    const { id }: any = req.params;
    if (id > 6 || id < 1)
      return res
        .status(200)
        .json({ message: 'Number specified is incorrect. Data not Found' });

    const data = await axios.get(`https://swapi.dev/api/films/${id}`);
    const charInfo = data.data;

    let result: Character;
    let characterList = [];
    let characterLink: string = '';
    let sortedData: any;
    let heightCount = 0;
    let heightInfo: string;

    for (let i = 0; i < charInfo.characters.length; i++) {
      characterLink = charInfo.characters[i];

      let characterBio = await axios.get(characterLink);
      let characterData = characterBio.data;

      characterList.push(characterData);
    }

    /**
     * Filter By Gender
     */
    if (gender) {
      characterList = characterList.filter((item: Record<string, any>) => {
        return item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase();
      });
    }

    /**
     * Sort By Name or Height
     */
    if (name || height) {
      if (name === 'ASC' || name === 'asc') {
        sortedData = characterList.sort(
          (a: any, b: any) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0)
        );
      }
      if (name === 'DESC' || name === 'desc') {
        sortedData = characterList.sort(
          (a: any, b: any) => b.name[0].charCodeAt(0) - a.name[0].charCodeAt(0)
        );
      }

      if (height === 'ASC' || height === 'asc') {
        sortedData = characterList.sort(
          (a: any, b: any) => parseInt(a.height) - parseInt(b.height)
        );
      }
      if (height === 'DESC' || height === 'desc') {
        sortedData = characterList.sort(
          (a: any, b: any) => parseInt(b.height) - parseInt(a.height)
        );
      }

      let totalNumberOfCharacters = sortedData.length;
      for (let i = 0; i < sortedData.length; i++) {
        heightCount += parseInt(sortedData[i].height);
      }
      heightInfo = `${heightCount}cm makes ${Math.round(
        heightCount / 30.48
      )}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
      result = {
        totalNumberOfCharacters: totalNumberOfCharacters,
        totalHeightOfCharacters: heightInfo,
        characterInfo: sortedData,
      };
      return res.status(201).json(result);
    } else {
      let totalNumberOfCharacters = characterList.length;
      for (let i = 0; i < characterList.length; i++) {
        heightCount += parseInt(characterList[i].height);
      }
      heightInfo = `${heightCount}cm makes ${Math.round(
        heightCount / 30.48
      )}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
      result = {
        totalNumberOfCharacters: totalNumberOfCharacters,
        totalHeightOfCharacters: heightInfo,
        characterInfo: characterList,
      };
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: 'Error retrieving Data' });
  }
};
