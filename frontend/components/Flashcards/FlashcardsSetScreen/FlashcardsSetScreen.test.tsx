import React from 'react';
import { render, fireEvent, waitFor, cleanup, act } from '@testing-library/react-native';
import FlashcardsSetScreen from './FlashcardsSetScreen';
import { AxiosContext } from '../../context/AxiosProvider/AxiosProvider';
import axios from 'axios';


jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));

afterEach(cleanup);

describe('<FlashcardsSetScreen />', () => {

    it('should set flashcards correctly after fetching data', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({ data: {
            id: 1,
            title: 'Test Title',
            fiches_translations: [
                {
                    translations: {
                        foreignTranslation: 'ass',
                        polishTranslation: 'dupa',
                    }
                }
            ],
            userId: 1,
            } 
        });

        const {findByText} = render(
            <AxiosContext.Provider value={{authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                <FlashcardsSetScreen pageSwitcher={() => {}} id={1}/>
            </AxiosContext.Provider>
        )

        await waitFor(async () => {
            expect(mockPublicAxios.get).toHaveBeenCalledWith('/fiches/id/1')
        })
    })

    it('should handle empty flashcards list and show modal', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({ data: {
            id: 1,
            title: 'Test Title',
            fiches_translations: [],
            userId: 1,
            } 
        });

         const {getByText} = render(
            <AxiosContext.Provider value={{authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                <FlashcardsSetScreen pageSwitcher={() => {}} id={1}/>
            </AxiosContext.Provider>
        )

        await waitFor(() => {
            expect(getByText('Nauczyłeś się juz wszystkiego! Zacznij teraz od nowa!')).toBeTruthy()
        })
    })
    
});


