import { Meta, StoryFn } from '@storybook/react';

import { IMovieCard } from './types';
import MovieCard from './MovieCard';
import React from 'react';

const meta = {
    title: 'Componentes/MovieCard',
    component: MovieCard,
    paraments: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                description: "A MovieCard component",
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number' },
        movieId: { control: 'number' },
        voteAverage: { control: 'number' },
        posterPath: { control:'text' },
    },
    tags: ["autodocs"],
} as Meta;

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;

/**
 * Default story of the MovieCard
 */
export const Default = Template.bind({});
Default.args = {
    posterPath: "https://image.tmdb.org/t/p/w500/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
    title: "Avatar: The Way of Water",
    voteAverage: 7.8,
    genreId: 878,
    movieId: 76600,
}