import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const apiMock = new MockAdapter(api);

describe('DashboardPage', () => {
  it('should be able to search for devs', async () => {
    const { getByText, getByTestId } = render(<Dashboard />);

    const selectExperienceField = getByText('Selecione uma opção');
    const selectUfField = getByText('Selecione um estado');
    const selectCityField = getByText('Selecione uma cidade');
    const selectTechsField = getByText('Selecione as tecnologias');

    const submitButton = getByTestId('submit-button');

    await selectEvent.select(selectExperienceField, ['12+ anos']);
    await selectEvent.select(selectUfField, ['Minas Gerais']);

    await waitFor(() => {
      fireEvent.click(selectCityField);
    });

    await selectEvent.select(selectCityField, ['Divinópolis']);
    await selectEvent.select(selectTechsField, ['React']);

    fireEvent.click(submitButton);

    apiMock.onGet('candidates').reply(200, [
      {
        id: 1,
        city: 'Divinópolis - MG',
        experience: '12+ years',
        technologies: [{ name: 'React' }],
      },
    ]);
  });

  it('should not be able to search for devs', async () => {
    const { getByText, getByTestId } = render(<Dashboard />);

    const selectExperienceField = getByText('Selecione uma opção');
    const selectUfField = getByText('Selecione um estado');
    const selectCityField = getByText('Selecione uma cidade');
    const selectTechsField = getByText('Selecione as tecnologias');

    const submitButton = getByTestId('submit-button');

    await selectEvent.select(selectExperienceField, ['12+ anos']);
    await selectEvent.select(selectUfField, ['Minas Gerais']);

    await waitFor(() => {
      fireEvent.click(selectCityField);
    });

    await selectEvent.select(selectCityField, ['Divinópolis']);
    await selectEvent.select(selectTechsField, ['React']);

    fireEvent.click(submitButton);

    apiMock.onGet('candidates').reply(500);
  });

  it('should not be able to search for devs without all filter options', async () => {
    const { getByText, getByTestId } = render(<Dashboard />);

    const selectUfField = getByText('Selecione um estado');
    const selectCityField = getByText('Selecione uma cidade');
    const selectTechsField = getByText('Selecione as tecnologias');

    const submitButton = getByTestId('submit-button');

    await selectEvent.select(selectUfField, ['Minas Gerais']);

    await waitFor(() => {
      fireEvent.click(selectCityField);
    });

    await selectEvent.select(selectCityField, ['Divinópolis']);
    await selectEvent.select(selectTechsField, ['React']);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Selecione uma experiência')).toBeInTheDocument();
    });
  });
});
