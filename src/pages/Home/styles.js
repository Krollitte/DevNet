import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #36393f;
`;
export const ButtonPost = styled.TouchableOpacity`
    background-color: #202225;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom:6%;
    right: 6%;
`;

export const ButtonFinishPost = styled.TouchableOpacity`
    width:50px;
    justify-content: center;
    align-items: center;
`;

export const ButtonCancelPost = styled.TouchableOpacity`
    width:50px;
    justify-content:center;
    align-items: center;
`;

export const ViewModal = styled.View`
    width:100%;
    height:80%; 
    justify-content: flex-end;
`;

export const TitleModal = styled.Text`
    font-size:23px;
    font-weight:bold;
`;

export const ListPosts = styled.FlatList`
    flex: 1;
    background-color: #f1f1f1;
`;