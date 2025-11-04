import { Header } from '@/common/components'
import { Routing } from '@/common/routing'
import s from './App.module.css'
import {Footer} from "@/common/components/Footer/Footer.tsx";

export const App = () => {
    return (
        <div className={s.app}>
            <Header />
            <main className={s.layout}>
                <Routing />
            </main>
            <Footer />
        </div>
    )
}
