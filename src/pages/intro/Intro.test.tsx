import React from 'react';
import {render} from '@testing-library/react';
import IntroPage from 'pages/intro/Intro';
import universityIcon from 'assets/images/icons/university.svg'
import studentIcon from 'assets/images/icons/student.svg'
import calculatorIcon from 'assets/images/icons/calculator.svg'

describe('Intro page test', () => {
  test('Page contains important elements', () => {
    const {getAllByText, getByAltText} = render(<IntroPage/>)

    const issuerIcon = getByAltText('University icon')
    const holderIcon = getByAltText('Student icon')
    const verifierIcon = getByAltText('Calculator icon')

    expect(getAllByText('Issuer')).toHaveLength(2)
    expect(getAllByText('Holder')).toHaveLength(2)
    expect(getAllByText('Verifier')).toHaveLength(2)

    expect(issuerIcon).toBeInTheDocument()
    expect(holderIcon).toBeInTheDocument()
    expect(verifierIcon).toBeInTheDocument()

    expect(issuerIcon).toHaveAttribute('src', universityIcon)
    expect(holderIcon).toHaveAttribute('src', studentIcon)
    expect(verifierIcon).toHaveAttribute('src', calculatorIcon)
  })
})
