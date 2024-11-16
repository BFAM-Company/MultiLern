import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import { UserDataContext } from '../context/UserContext/UserContext';
import DynamicHeader from './MainScreenComponents/DynamicHeader/DynamicHeader';
import { useNavigate } from 'react-router-dom';
import BoxCarousel from './MainScreenComponents/BoxCarousel/BoxCarousel';
import UserModal from './MainScreenComponents/UserModal/UserModal';
import NotificationModal from './NotificationModal/NotificationModal';
import NotepadSection from './NotepadSection/NotepadSection';
import FlashcardsSection from './FlashcardsSection/FlashcardsSection';
import ExercisesSection from './ExercisesSection/ExcercisesSection';
import { Spinner } from 'react-bootstrap';
import ExercisesCard from './ExcercisesCard'

function MainScreen() {
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [notiModalVisible, setNotiModalVisible] = useState(false);
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserDataContext);
    const { publicAxios, authAxios } = useContext(AxiosContext);
    const [loading, setLoading] = useState(false);
    const [exercises, setExercises] = useState<any[]>([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetchUserData();
        const fetchPosts = async () => {
            setLoading(true);
            const result = await publicAxios.get(`/posts`);
            if (result.data) {
                setLoading(false);
                setExercises(result.data);
            }
        };
        fetchPosts();
    }, [authContext?.authState.authenticated]);

    const actionNavigate = (url: string) => {
        navigate(url)
    }

    const fetchUserData = async () => {
        try {
            if (!authContext?.authState.isLoggingByGuest) {
                const userDataResponse = await authAxios.get('/users/me');
                if (userDataResponse.data)
                    userContext?.setUserData({
                        id: userDataResponse.data.id,
                        nickname: userDataResponse.data.nickname,
                        avatar: { uri: userDataResponse.data.avatar } as unknown as string,
                        email: userDataResponse.data.email,
                    });
                else {
                    userContext?.setUserData({
                        id: -1,
                        nickname: 'Gość',
                        avatar: require('./../../assets/demo-user-icon.png'),
                        email: '',
                    });
                }
            } else {
                userContext?.setUserData({
                    id: -1,
                    nickname: 'Gość',
                    avatar: require('./../../assets/demo-user-icon.png'),
                    email: '',
                });
            }
        } catch (error) {
            await localStorage.clear();
            authContext?.setAuthState({
                accessToken: '',
                refreshToken: '',
                authenticated: false,
            });
        }
    };

    const calcRating = (exercise: any) => {
        let rating = 0;
        let counter = 0;
        if (exercise.posts_reviews && Array.isArray(exercise.posts_reviews)) {
            for (let i = 0; i < exercise.posts_reviews.length; i++) {
                counter++;
                rating += exercise.posts_reviews[i].reviews.rate;
            }
            if (counter > 0) {
                return rating / counter;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    function formatDate(isoDateString: any) {
        const months = [
            "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
            "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
        ];

        const date = new Date(isoDateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const formattedDate = `${day} ${months[monthIndex]} ${year}`;
        return formattedDate;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <UserModal isVisible={userModalVisible} hideHandler={() => setUserModalVisible(false)} user={userContext?.userData} buttonAction={actionNavigate} />
            <NotificationModal isVisible={notiModalVisible} hideHandler={() => setNotiModalVisible(false)} buttonAction={actionNavigate} />
            <div style={{ position: 'relative', width: '100%', height: 'auto', background: 'linear-gradient(to bottom, #000, #333)', paddingTop: 350 }}>
                <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    {/* <DynamicHeader/> */}
                </div>
                <div style={{ padding: '0 20px', marginTop: '50px' }}>
                    <div style={{ width: '100%', height: 3, backgroundColor: 'lightgray', marginTop: 5, marginBottom: 150 }}></div>
                    <BoxCarousel/>
                    <NotepadSection/>
                    <FlashcardsSection/>
                    <ExercisesSection/>
                    <h2 style={{ fontSize: '25px', fontWeight: '900', paddingTop: '50px' }}>
                        Najnowsze zadania, które czekają na odpowiedź
                    </h2>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {loading ? (
                            <Spinner style={{ margin: 15 }} />
                        ) : null}
                        {exercises.slice(0, 3).map(exercise => {
                            const rating = calcRating(exercise);
                            const isoDateString = exercise.date;
                            const formattedDate = formatDate(isoDateString);
                            return (
                                <ExercisesCard
                                    key={exercise.id}
                                    user_data={exercise.users_posts}
                                    id={exercise.id}
                                    category={exercise.category}
                                    title={exercise.title}
                                    description={exercise.content}
                                    rate={rating}
                                    date={formattedDate}
                                    posts_images={exercise.posts_images}
                                />
                            );
                        })}
                        <button
                            onClick={() => navigate(`/excercises?searchableText=${' '}`)}
                            style={{ width: '90%', height: 50, backgroundColor: 'rgb(45,45,55)', margin: 20, borderRadius: 20, textAlign: 'center', color: 'white', fontSize: '18px', fontWeight: '900' }}
                        >
                            Pokaż więcej...
                        </button>
                    </div>
                    {/* <SubjectsSection/> */}
                    {/* <ExamsSection/> */}
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
