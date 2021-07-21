import axios from 'axios';
import { Request, Response } from 'express';

export const getMovieCharacter = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const name = req.query.name && (req.query.name as string);
    const height = req.query.height && req.query.height;
    const gender = req.query.gender as string;
    if (id > 6 || id < 1)
      return res
        .status(404)
        .json({ message: ' Id specified is not correct. Data not Found' });
    const data = await axios.get(`https://swapi.dev/api/films/${id}`);
    const result = data.data;
    let characterArray = [];
    let sortedData: any;
    let heightCount = 0;
    let heightInfo;
    let originalResult;
    for (let i = 0; i < result.characters.length; i++) {
      let characterLink = result.characters[i];
      let characterBio = await axios.get(characterLink);
      characterArray.push(characterBio.data);
    }
    if (gender) {
      characterArray = characterArray.filter((item) => {
        return item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase();
      });
    }
    if (name || height) {
      switch (name) {
        case 'asc':
          sortedData = characterArray.sort(
            (a, b) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0)
          );
          break;
        case 'desc':
          sortedData = characterArray.sort(
            (a, b) => b.name[0].charCodeAt(0) - a.name[0].charCodeAt(0)
          );
          break;
      }
      switch (height) {
        case 'asc':
          sortedData = characterArray.sort(
            (a, b) => parseInt(a.height) - parseInt(b.height)
          );
          break;
        case 'desc':
          sortedData = characterArray.sort(
            (a, b) => parseInt(b.height) - parseInt(a.height)
          );
          break;
      }
      let totalNumberOfCharacters: number = sortedData.length;
      for (let i = 0; i < totalNumberOfCharacters; i++) {
        heightCount += parseInt(sortedData[i].height);
      }
      heightInfo = `${heightCount}cm makes ${Math.round(
        heightCount / 30.48
      )}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
      originalResult = {
        totalNumberOfCharacters,
        totalHeightOfCharacters: heightInfo,
        characterInfo: sortedData,
      };
      return res.status(201).json(originalResult);
    } else {
      let totalNumberOfCharacters = characterArray.length;
      for (let i = 0; i < characterArray.length; i++) {
        heightCount += parseInt(characterArray[i].height);
      }
      heightInfo = `${heightCount}cm makes ${Math.round(
        heightCount / 30.48
      )}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
      originalResult = {
        totalNumberOfCharacters,
        totalHeightOfCharacters: heightInfo,
        characterInfo: characterArray,
      };
      return res.status(200).json(originalResult);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: 'Error retrieving Data' });
  }
};
