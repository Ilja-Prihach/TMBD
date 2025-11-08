import { Header } from '@/common/components'
import { Routing } from '@/common/routing'
import s from './App.module.css'
import {Footer} from "@/common/components/Footer/Footer.tsx";
import {store} from "@/app/model/store/store.ts";
import {Provider} from "react-redux";
import {ThemeProvider} from "@/app/model/store/theme/providers/ThemeProvider.tsx";
import {GlobalLoader} from "@/common/components/LinearProgress/GlobalLoader.tsx";

export const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <div className={s.app}>
                    <Header />
                    <GlobalLoader />
                    <main className={s.layout}>
                        <Routing />
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </Provider>
    )
}