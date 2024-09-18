import { useContext, useEffect } from 'react';
import { CommonFullCont } from '../../../assets/common-styles/common.styles';
import { xml2js } from 'xml-js';
import AppContext from '../../../providers/context';
import { ContentBox } from './DatasetList.style';

const url =
  'https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&request=GetCapabilities&AcceptFormats=application/json';

const DatasetList = () => {
  const {
    dataSetList: { capabilities, setCapabilities },
  } = useContext(AppContext);
  if (!capabilities) throw Error('Context not provided in scope');

  useEffect(() => {
    async function fetchCapabilities() {
      const response = await fetch(url);
      try {
        const body = await response.text();
        const capabilities = xml2js(body, { compact: true })[
          'wfs:WFS_Capabilities'
        ]['FeatureTypeList']['FeatureType'];
        setCapabilities(capabilities);
      } catch {
        throw Error('Error fetching GeoBC WFS capabilities');
      }
    }
    fetchCapabilities();
  }, []);

  return (
    <CommonFullCont>
      <ContentBox>
        {capabilities.map((dataset) => {
          let metadataLink;
          try {
            metadataLink = (
              <a href={dataset['MetadataURL']['_attributes']['xlink:href']}>
                DataBC link
              </a>
            );
          } catch {
            metadataLink = '';
          }
          return (
            <p key={dataset?.Title?._text ?? Math.random()}>
              {dataset['Title']['_text']}
              <br />
              {dataset['Name']['_text'].slice(4)}
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
