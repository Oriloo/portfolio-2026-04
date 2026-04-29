import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'

export default function App() {
    const { i18n } = useTranslation()

    useEffect(() => {
        document.documentElement.lang = i18n.language
    }, [i18n.language])

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/projects/:id" element={<ProjectPage/>}/>
        </Routes>
    )
}
