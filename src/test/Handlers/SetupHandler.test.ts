import SetupHandler from "../../app/Handlers/SetupHandler";

describe('test the SetupHandler class', () => {

    let setupHandler: SetupHandler;

    const mockInitialDataSetup = {
        createDatabase: jest.fn()
    };

    test('it should update all expired records', async () => {
        setupHandler = new SetupHandler(mockInitialDataSetup as any);
        await setupHandler.setup();
        expect(mockInitialDataSetup.createDatabase).toBeCalled();
    });

})