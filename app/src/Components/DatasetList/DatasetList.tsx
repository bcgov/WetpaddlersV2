import { useEffect, useState } from "react";
import { CommonFullCont } from "../../assets/common-styles/common.styles";
import { xml2js } from 'xml-js';

const url = 'https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&request=GetCapabilities&AcceptFormats=application/json';

const DatasetList = () => {
  const [capabilities, setCapabilities] = useState([]);

  useEffect(() => {
    async function fetchCapabilities() {
      const response = await fetch(url);
      try {
        const body = await response.text();
        const capabilities = xml2js(body, {compact: true})['wfs:WFS_Capabilities']['FeatureTypeList']['FeatureType'];        
        setCapabilities(capabilities);
      }
      catch {
        throw Error('Error fetching GeoBC WFS capabilities');
      }
    };
    fetchCapabilities();
  }, []);

  return (
    <CommonFullCont>
      {
        capabilities.map(dataset => {
          let metadataLink;
          try {
            metadataLink = <a href={dataset['MetadataURL']['_attributes']['xlink:href']}>DataBC link</a>;
          } catch {
            metadataLink = '';
          }
          return <p>
            {dataset['Title']['_text']}<br/>
            {dataset['Name']['_text'].slice(4)}<br/> 
            {metadataLink}
          </p>
        })
      }
    </CommonFullCont>
  );
};

export default DatasetList;
