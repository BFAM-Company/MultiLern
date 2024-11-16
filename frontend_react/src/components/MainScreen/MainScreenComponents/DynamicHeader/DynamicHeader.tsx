import SearchBar from '../../../SearchBar/SearchBar.tsx';
import './DynamicHeader.css'


function DynamicHeader() {
  return (
    <div className={'fixedContainer'}>
      <div className={'LogoContainer'}>
        <img src={require('../../../../assets/multilern-logo.png')} alt="Logo" />
        <div className={'titleText'}>MultiLern</div>
      </div>
      <SearchBar currentText={''} setModalVisibility={function (visible: boolean): void {
              throw new Error('Function not implemented.');
          } } modalVisibility={false} />
    </div>
  );
}


export default DynamicHeader;
