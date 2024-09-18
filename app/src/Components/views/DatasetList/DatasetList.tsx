import { useSelector } from 'react-redux';
import { CommonFullCont } from '../../../assets/common-styles/common.styles';
import { ContentBox } from './DatasetList.style';

const DatasetList = () => {
  const layersDict = useSelector((state: any) => state.MapState.layersDict);

  return (
    <CommonFullCont>
      <ContentBox>
        {Object.keys(layersDict).map((id) => {
          let metadataLink;
          try {
            metadataLink = (
              <a href={layersDict[id].metadataLink}>DataBC link</a>
            );
          } catch {
            metadataLink = '';
          }
          return (
            <p key={layersDict.id}>
              {layersDict[id].title}
              <br />
              {layersDict[id].name}
              <br />
              {metadataLink}
            </p>
          );
        })}
      </ContentBox>
    </CommonFullCont>
  );
};

export default DatasetList;
