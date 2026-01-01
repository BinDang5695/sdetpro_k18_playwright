import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import CustomersPage from "./CustomersPage";
import BasePage from "./BasePage";
import ContactsPage from "./ContactsPage";
import HeaderPage from "./HeaderPage";
import ProjectsPage from "./ProjectsPage";
import TasksPage from "./TasksPage";
import ExpensesPage from "./ExpensesPage";
import ContractsPage from "./ContractsPage";
import KnowledgeBasePage from "./KnowledgeBasePage";
import LeadsPage from "./LeadsPage";
import ItemsPage from "./ItemsPage";
import ProposalsPage from "./ProposalsPage";

export default class PageFactory {
    constructor(private page: Page) {}

    loginPage(): LoginPage {
        return new LoginPage(this.page);
    }

    customersPage(): CustomersPage {
        return new CustomersPage(this.page);
    }

    basePage(): BasePage {
        return new BasePage(this.page);
    }

    contactsPage(): ContactsPage {
        return new ContactsPage(this.page);
    }

    headerPage(): HeaderPage {
        return new HeaderPage(this.page);
    }

    projectsPage(): ProjectsPage {
        return new ProjectsPage(this.page);
    }

    tasksPage(): TasksPage {
        return new TasksPage(this.page);
    }

    expensesPage(): ExpensesPage {
        return new ExpensesPage(this.page);
    }

    contractsPage(): ContractsPage {
        return new ContractsPage(this.page);
    }

    knowledgeBasePage(): KnowledgeBasePage {
        return new KnowledgeBasePage(this.page);
    }

    leadsPage(): LeadsPage {
        return new LeadsPage(this.page);
    }

    itemsPage(): ItemsPage {
        return new ItemsPage(this.page);
    }

    proposalsPage(): ProposalsPage {
        return new ProposalsPage(this.page);
    }
    
}
